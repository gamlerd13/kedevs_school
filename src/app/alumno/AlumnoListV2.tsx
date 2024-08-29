"use client";
import React, { useContext, useState } from "react";
import {
  Alumno,
  AlumnoList,
  gradeLabels,
  sectionLabels,
} from "@/models/alumno";
import useAlumno from "./hooks/useAlumno";
import { FaEdit } from "react-icons/fa";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { FormContext, ModalContext, UseAlumnoContext } from "./page";
import { ButtonCreateInstance } from "@/components/Button";
import { InputSearch } from "@/components/InputSearch";
import { ToolTipEdit } from "@/components/ToolTip";
import ModalForm from "./ModalForm";

function removeAccents(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function AlumnoListV2() {
  const { isOpen, onOpen, onOpenChange, onClose } = useContext(ModalContext);
  const { alumnos, addData, updateData } = useContext(UseAlumnoContext);
  const { handleOpenModal } = useContext(FormContext);

  // const { data: alumnos, addData, updateData } = useAlumno<AlumnoList>();

  // List
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchFilter, setSearchFilter] = useState<string>("");

  // const rowsPerPage = 10;
  const pages = Math.ceil(alumnos.length / rowsPerPage);

  const items: AlumnoList[] = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    if (searchFilter.trim() !== "") {
      const normalizedSearchFilter = removeAccents(
        searchFilter.trim().toLowerCase(),
      );
      const filteredAlumnos = alumnos.filter((alumno) =>
        removeAccents(alumno.fullName.toLowerCase()).includes(
          normalizedSearchFilter,
        ),
      );
      return filteredAlumnos.slice(start, end);
    } else {
      return alumnos.slice(start, end);
    }
  }, [page, alumnos, rowsPerPage, searchFilter]);

  return (
    <>
      <Table
        aria-label="Example table with client side pagination"
        bottomContent={
          <div className="flex w-full justify-center">
            <div className="flex gap-2">
              <Pagination
                // isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
                className="p-2"
              />
            </div>
          </div>
        }
        topContent={TopContentDataTable({
          alumnos: alumnos.length,
          setRowsPerPage,
          searchFilter,
          setSearchFilter,
        })}
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn>N°</TableColumn>
          <TableColumn>Nombre Completo</TableColumn>
          <TableColumn>DNI</TableColumn>
          <TableColumn>Grado y Sección</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {items &&
            items.map((alumno, index) => (
              <TableRow key={alumno.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{alumno.fullName}</TableCell>
                <TableCell>{alumno.dni}</TableCell>
                <TableCell>
                  {gradeLabels[alumno.grade]} - {sectionLabels[alumno.section]}
                </TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleOpenModal({
                          isCreate: false,
                          formData: {
                            id: alumno.id,
                            fullName: alumno.fullName,
                            dni: alumno.dni,
                            grade: alumno.grade,
                            section: alumno.section,
                          },
                        })
                      }
                    >
                      <ToolTipEdit name={alumno.fullName} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}

// #region Top Content DataTable

interface TopContentDataTable {
  alumnos: number;
  setRowsPerPage: (row: number) => void;
  searchFilter: string;
  setSearchFilter: (value: string) => void;
}

const TopContentDataTable = ({
  alumnos,
  setRowsPerPage,
  searchFilter,
  setSearchFilter,
}: TopContentDataTable) => {
  const { handleOpenModal } = useContext(FormContext);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <InputSearch value={searchFilter} setValue={setSearchFilter} />
        <ButtonCreateInstance
          handleClick={() =>
            handleOpenModal({ isCreate: true, formData: null })
          }
        />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total {alumnos} alumnos
        </span>
        <label className="flex items-center text-default-400 text-small">
          Filas por pagina:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
          >
            <option value="10">10</option>
            <option value="5">5</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default AlumnoListV2;

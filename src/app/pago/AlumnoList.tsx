"use client";
import React, { useContext, useState } from "react";
import {
  Alumno,
  AlumnoList,
  gradeLabels,
  sectionLabels,
} from "@/models/alumno";
import useAlumno from "./hooks/useAlumnoPayment";
import { FaMoneyBillWave } from "react-icons/fa";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Chip,
  Button,
} from "@nextui-org/react";
import { Badge } from "@nextui-org/badge";
import { FormContext, ModalContext, UseAlumnoContext } from "./page";
import { ButtonCreateInstance } from "@/components/Button";
import { InputSearch } from "@/components/InputSearch";
import { ToolTipEdit } from "@/components/ToolTip";
import ModalForm from "./ModalForm";
import { AlumnoPayment } from "@/models/payment";
import Link from "next/link";

function removeAccents(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function AlumnoListComponent() {
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

  const items: AlumnoPayment[] = React.useMemo(() => {
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
          <TableColumn>Datos</TableColumn>
          {/* <TableColumn>Grado y Sección</TableColumn> */}
          <TableColumn>Último Pago</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {items &&
            items.map((alumno, index) => (
              <TableRow key={alumno.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <div className="list-disc list-inside font-medium">
                    {alumno.fullName}
                  </div>
                  <div className="list-disc list-inside text-blue-700">
                    {alumno.dni}
                  </div>
                </TableCell>
                <TableCell>
                  {alumno.payments.length ? (
                    <div className="flex flex-col">
                      <span>{alumno.payments[0]?.paymentConcept.name}</span>
                      <Chip color="success" size="sm">
                        {`s/. ${alumno.payments[0]?.total}`}
                      </Chip>
                    </div>
                  ) : (
                    <Chip color="danger" size="sm" variant="bordered">
                      --
                    </Chip>
                  )}
                </TableCell>
                {/* <TableCell>
                {gradeLabels[alumno.grade]} - {sectionLabels[alumno.section]}
              </TableCell> */}
                <TableCell>
                  <div className="text-md mobile:flex">
                    {/* <Button
                    type="button"
                    className="flex bg-green-700 text-white p-0"
                    onClick={() =>
                      handleOpenModal({
                        isCreate: true,
                        alumno: alumno,
                      })
                    }
                  >
                    <FaMoneyBillWave />
                    Pagar
                  </Button> */}
                    <Link href={`/pago/alumno/${alumno.id}`}>
                      <button
                        type="button"
                        className="flex rounded-lg p-2 bg-default h-full justify-center items-center"
                      >
                        Detalles
                      </button>
                    </Link>
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
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <InputSearch value={searchFilter} setValue={setSearchFilter} />
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

export default AlumnoListComponent;

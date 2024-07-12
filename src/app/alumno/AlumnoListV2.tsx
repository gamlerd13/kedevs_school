"use client";
import React, { useContext, useState } from "react";
import { AlumnoList, gradeLabels, sectionLabels } from "@/models/alumno";
import useAlumno from "./hooks/useAlumno";
import { IoEye, IoSearchCircleOutline } from "react-icons/io5";
import { PiPlusCircleDuotone } from "react-icons/pi";

import { FaEdit } from "react-icons/fa";
import { TbTrashXFilled } from "react-icons/tb";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Pagination,
  Button,
  Input,
} from "@nextui-org/react";
import { ModalCreateAlumnoContext } from "./page";

function removeAccents(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function AlumnoListV2() {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const { data: alumnos, isLoading } = useAlumno<AlumnoList>();

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

  console.log("Actualizando en lista de alumnos", alumnos);
  return (
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
      topContent={TopContentDataTable(
        alumnos.length,
        setRowsPerPage,
        searchFilter,
        setSearchFilter,
      )}
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
        {(alumno) => (
          <TableRow key={alumno.id}>
            <TableCell>{alumno.id}</TableCell>
            <TableCell>{alumno.fullName}</TableCell>
            <TableCell>{alumno.dni}</TableCell>
            <TableCell>
              {gradeLabels[alumno.grade]} - {sectionLabels[alumno.section]}
            </TableCell>
            <TableCell>
              <div className="relative flex items-center gap-2">
                <Tooltip
                  color="primary"
                  className="px-2"
                  content="Detalles"
                  delay={0}
                  closeDelay={0}
                  offset={-4}
                >
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <IoEye />
                  </span>
                </Tooltip>
                <Tooltip
                  content="Editar Alumno"
                  className="px-2"
                  delay={0}
                  closeDelay={0}
                  offset={-4}
                >
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <FaEdit />
                  </span>
                </Tooltip>
                <Tooltip
                  color="danger"
                  content="Desactivar Alumno"
                  className="px-2"
                  closeDelay={0}
                  delay={0}
                  offset={-4}
                >
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <TbTrashXFilled />
                  </span>
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

// #region Top Content DataTable
const TopContentDataTable = (
  alumnos: number,
  setRowsPerPage: (row: number) => void,
  searchFilter: string,
  setSearchFilter: (value: string) => void,
) => {
  const onOpen = useContext(ModalCreateAlumnoContext);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Buscar por nombre ..."
          startContent={<IoSearchCircleOutline />}
          value={searchFilter}
          // onClear={() => onClear(setSearchFilter)}
          onValueChange={(e) => setSearchFilter(e)}
        />
        <Button
          onPress={onOpen}
          color="primary"
          endContent={<PiPlusCircleDuotone />}
        >
          Agregar Alumno
        </Button>
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

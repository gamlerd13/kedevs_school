"use client";
import React, { useState } from "react";
import { AlumnoList, gradeLabels, sectionLabels } from "@/models/alumno";
import useAlumno from "./hooks/useAlumno";
import { IoEye } from "react-icons/io5";
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
} from "@nextui-org/react";

function AlumnoListV2() {
  const [page, setPage] = useState<number>(1);
  const { data: alumnos, isLoading } = useAlumno<AlumnoList>();

  const rowsPerPage = 10;
  const pages = Math.ceil(alumnos.length / rowsPerPage);

  const items: AlumnoList[] = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return alumnos.slice(start, end);
  }, [page, alumnos]);

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="flat"
              color="default"
              onPress={() => setPage((prev) => (prev > 1 ? prev - 1 : prev))}
            >
              Previous
            </Button>
            <Pagination
              // isCompact
              // showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
              className="p-2"
            />
            <Button
              size="sm"
              variant="flat"
              color="default"
              onPress={() =>
                setPage((prev) => (prev < pages ? prev + 1 : prev))
              }
            >
              Next
            </Button>
          </div>
        </div>
      }
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

export default AlumnoListV2;

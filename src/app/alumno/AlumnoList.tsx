"use client";
import React from "react";
import { Alumno } from "@/models/alumno";
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
} from "@nextui-org/react";

function AlumnoList() {
  const { data: alumnos, isLoading } = useAlumno<Alumno>();

  // If our data is not dinamic, this works
  // const alumnos = [{
  //   id: 1,
  //   fullName: "eder",
  //   dni: "654654654",
  //   grade: "A"
  // }]

  // if (!alumnos) {
  //   return <div>There is no data</div>;
  // }
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>N°</TableColumn>
        <TableColumn>Nombre Completo</TableColumn>
        <TableColumn>DNI</TableColumn>
        <TableColumn>Estado</TableColumn>
        <TableColumn>Acciones</TableColumn>
      </TableHeader>

      {alumnos?.length ? (
        <TableBody>
          {alumnos?.map((alumno, index) => (
            <TableRow key={alumno.id}>
              <TableCell>{index}</TableCell>
              <TableCell>{alumno.fullName}</TableCell>
              <TableCell>{alumno.dni}</TableCell>
              <TableCell>{alumno.grade}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip color="primary" className="px-2" content="Detalles">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <IoEye />
                    </span>
                  </Tooltip>
                  <Tooltip content="Editar Alumno" className="px-2">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <FaEdit />
                    </span>
                  </Tooltip>
                  <Tooltip
                    color="danger"
                    content="Desactivar Alumno"
                    className="px-2"
                  >
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <TbTrashXFilled />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      ) : isLoading ? (
        <TableBody emptyContent={"Cargando..."}>{[]}</TableBody>
      ) : (
        <TableBody emptyContent={"No hay datos"}>{[]}</TableBody>
      )}
    </Table>
  );
}

export default AlumnoList;

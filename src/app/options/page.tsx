"use client";
import React from "react";
import { useYear } from "./hooks/useYear";
import Loading from "../alumno/loading";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

function OptionsPage() {
  const { currentYear } = useYear();
  if (!currentYear) return <Loading />;

  return (
    <>
      <div className="flex sm:flex-row flex-col">
        <Card className="w-full">
          <CardHeader>
            <h1>Aqui configurar el establecer el año</h1>
          </CardHeader>
          <CardBody></CardBody>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <h1>Aqui configurar el pasar de grado del alumno</h1>
          </CardHeader>
          <CardBody></CardBody>
        </Card>
      </div>
    </>
  );
}

export default OptionsPage;

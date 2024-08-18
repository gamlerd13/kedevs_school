"use client";
import React from "react";
import { useYear } from "./hooks/useYear";
import Loading from "../alumno/loading";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import YearConfig from "./YearConfig";
import GradeConfig from "./GradeConfig";

function OptionsPage() {
  const { currentYear, updateYear } = useYear();
  if (!currentYear) return <Loading />;

  return (
    <>
      <div className="flex sm:flex-row flex-col gap-2">
        <Card className="w-full">
          <CardHeader>
            <h1 className="font-bold">{currentYear.year}</h1>
          </CardHeader>
          <CardBody>
            <YearConfig
              currentYear={currentYear.year}
              updateYear={updateYear}
            />
          </CardBody>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <h1>Aqui configurar el pasar de grado del alumno</h1>
          </CardHeader>
          <CardBody>
            <GradeConfig />
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default OptionsPage;

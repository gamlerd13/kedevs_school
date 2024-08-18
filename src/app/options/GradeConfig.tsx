import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Chip } from "@nextui-org/react";

import React, { FormEvent } from "react";
import { toast } from "sonner";

function GradeConfig() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password")?.toString();

    if (!password) {
      toast.error("Ingrese la contraseña de seguridad");
      return;
    }
  };
  return (
    <div className="p-4">
      <h1 className="font-medium">
        Pasar de Año{" "}
        <Chip size="sm" color="warning">
          Usar cada comienzo de año esta funcionalidad
        </Chip>
      </h1>
      <span className="text-rose-500 text-sm">
        Importante: Aquí se va a pasar de grado a todos los alumnos mediante un
        click, es importante tener cuidado con esto, ya que es irreversible, de
        igual manera se pedirá la contraseña para poder realizar la operación
      </span>

      <div className="pt-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="w-full">
            <Input
              className="w-full"
              name="password"
              label="Contraseña"
              type="password"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="submit" color="danger">
              Pasar de grado
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GradeConfig;

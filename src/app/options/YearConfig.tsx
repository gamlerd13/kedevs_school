"use client";
import React, { FormEvent } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { Button, Input } from "@nextui-org/react";
import { toast } from "sonner";

const yearList = ["2024", "2025", "2026", "2027", "2028", "2029", "2030"];
interface SetFormDataYear {
  year: string;
}
export default function YearConfig({
  currentYear,
  updateYear,
}: {
  currentYear: number;
  updateYear: (formData: SetFormDataYear) => void;
}) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const year = formData.get("year")?.toString();

    if (!year) {
      toast.error("Los campos no deben estar vacíos");
      return;
    }
    updateYear({ year });
  };
  return (
    <div className="p-4">
      <h1 className="font-medium">Establecer Año</h1>
      <span className="text-rose-500 text-sm">
        Importante: Aquí se va a establecer el año actual, sirve para trabajar
        exclusivamente con este año en las operaciones de pago.
      </span>

      <div className="pt-4">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <div>
              <Select label="Año" placeholder="Seleccione" name="year">
                {yearList
                  .filter((year) => parseInt(year) !== currentYear)
                  .map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
              </Select>
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="submit" color="danger">
                Establecer
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

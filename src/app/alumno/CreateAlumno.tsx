"use client";
import { useState, FormEvent } from "react";
import { Grade, Section } from "@prisma/client";

import { Button, Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { gradeLabels, sectionLabels } from "@/models/alumno";
import { FormData, FormErrors } from "@/models/alumno";
import axios from "axios";

function CreateAlumnoForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    dni: "",
    grade: "",
    section: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    fullName: "",
    dni: "",
    grade: "",
    section: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    const newErrors = validateForm();

    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      return;
    }
    console.log(formData);

    try {
      const response = await axios.post("/api/alumno/", formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    onClose();
  };

  const validateForm = () => {
    const newErrors = {
      fullName: "",
      dni: "",
      grade: "",
      section: "",
    };

    if (formData.fullName.trim() === "") {
      newErrors.fullName = "Nombre Completo es requerido";
    }
    if (formData.dni.trim() === "") {
      newErrors.dni = "DNI es requerido";
    }
    if (formData.grade === "") {
      newErrors.grade = "Grado es requerido";
    }
    if (formData.section === "") {
      newErrors.section = "Sección es requerida";
    }

    return newErrors;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <Input
          type="text"
          name="fullName"
          label={`Nombre completo ${errors.fullName && "(Requerido)"}`}
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Carlos ..."
        />

        <Input
          type="number"
          name="dni"
          label={`DNI ${errors.dni && "(Requerido)"}`}
          value={formData.dni}
          onChange={handleChange}
          placeholder="750..."
        />

        <div className="w-full flex gap-2">
          <Select
            label={`Grado ${errors.grade && "(Requerido)"}`}
            placeholder="Seleccione"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
          >
            {Object.keys(Grade).map((key) => (
              <SelectItem key={key} value={key}>
                {gradeLabels[key as Grade]}
              </SelectItem>
            ))}
          </Select>

          <Select
            label={`Sección ${errors.section && "(Requerido)"}`}
            placeholder="Seleccione"
            name="section"
            value={formData.section}
            onChange={handleChange}
          >
            {Object.keys(Section).map((key) => (
              <SelectItem key={key} value={key}>
                {sectionLabels[key as Section]}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            color="danger"
            variant="light"
            onPress={onClose}
          >
            Cerrar
          </Button>
          <Button color="default" type="submit">
            Crear
          </Button>
        </div>
      </div>
    </form>
  );
}

export default CreateAlumnoForm;

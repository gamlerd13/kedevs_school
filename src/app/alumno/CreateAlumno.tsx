"use client";
import { useState, FormEvent, useContext } from "react";
import { Grade, Section } from "@prisma/client";
import { FormData, FormErrors } from "@/models/alumno";

import { Button, Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import {
  Alumno,
  AlumnoList,
  gradeLabels,
  sectionLabels,
} from "@/models/alumno";
import { FormContext, ModalContext } from "./page";

interface CreateAlumnoFormProps {
  addData: (formData: FormData) => void;
  updateData: (formData: Alumno) => void;
}

function CreateAlumnoForm({ addData, updateData }: CreateAlumnoFormProps) {
  const { initialValueForm, isCreate } = useContext(FormContext);
  const { onClose } = useContext(ModalContext);

  let initialValueAlumno = {
    fullName: "",
    dni: "",
    grade: "",
    section: "",
  };
  if (!isCreate && initialValueForm) {
    initialValueAlumno = {
      fullName: initialValueForm.fullName,
      dni: initialValueForm.dni,
      grade: initialValueForm.grade,
      section: initialValueForm.section,
    };
  }
  const [formData, setFormData] = useState<Alumno>(initialValueAlumno);

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
    const newErrors = validateForm();

    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      return;
    }
    if (isCreate) {
      await addData(formData);
    } else {
      await updateData({ ...formData, id: initialValueForm?.id });
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
            // value={Grade.GARDEN_3}
            value={formData.grade}
            defaultSelectedKeys={[formData.grade]}
            onChange={handleChange}
          >
            {/* {Object.keys(Grade).map((key) => (
              <SelectItem key={key} value={Grade[key as keyof typeof Grade]}>
                {gradeLabels[key as Grade]}
              </SelectItem>
            ))} */}

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
            defaultSelectedKeys={[formData.section]}
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
            {isCreate ? "Crear" : "Actualizar"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default CreateAlumnoForm;

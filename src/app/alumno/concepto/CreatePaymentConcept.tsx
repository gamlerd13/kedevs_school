"use client";
import { useState, FormEvent } from "react";
import { Grade, Section } from "@prisma/client";

import { Button, Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { gradeLabels, sectionLabels } from "@/models/alumno";
import {
  FormDataPaymentConcept,
  FormErrorsPaymentConcept,
} from "@/models/payment";
import axios from "axios";
import { toast } from "sonner";
import { usePaymentConcept } from "./hooks/usePayment";
import { PaymentConcept } from "@/models/payment";

function CreatePaymentConcept({
  onClose,
  create,
  dataEdit,
  addData,
  updateData,
}: {
  onClose: () => void;
  create: boolean;
  dataEdit?: PaymentConcept | null;
  addData: (formData: FormDataPaymentConcept) => void;
  updateData: (formData: PaymentConcept) => void;
}) {
  let initialValueForm: { name: string; total: string } = {
    name: "",
    total: "0.0",
  };

  if (dataEdit) {
    initialValueForm = {
      name: dataEdit.name,
      total: dataEdit.total,
    };
  }

  const [formData, setFormData] =
    useState<FormDataPaymentConcept>(initialValueForm);
  const [errors, setErrors] = useState<FormErrorsPaymentConcept>({
    nameError: "",
    totalError: "",
  });

  // Handle onchangue in inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const valueToUpdate = type === "number" ? parseFloat(value) : value;
    setFormData({
      ...formData,
      [name]: valueToUpdate,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      return;
    }
    console.log(formData);

    if (create) {
      await addData(formData);
    } else {
      await updateData({ ...formData, id: dataEdit?.id });

      console.log("Aqui vamos a actualizar este dato");
    }

    onClose();
  };

  const validateForm = () => {
    const newErrors = {
      nameError: "",
      totalError: "",
    };
    if (formData.name.trim() === "") {
      newErrors.nameError = "nombre es requerido";
    }
    if (!formData.total || parseFloat(formData.total) < 0) {
      newErrors.totalError = "total es requerido";
    }
    return newErrors;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <Input
          type="text"
          name="name"
          label={`Nombre ${errors.nameError && "(Requerido)"}`}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Pago Mes julio"
        />
        <Input
          type="number"
          name="total"
          label={`Precio ${errors.totalError && "(Requerido y mayor que cero)"}`}
          value={formData.total.toString()}
          onChange={(e) => setFormData({ ...formData, total: e.target.value })}
          placeholder="100.2"
        />

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
            Enviar
          </Button>
        </div>
      </div>
    </form>
  );
}

export default CreatePaymentConcept;

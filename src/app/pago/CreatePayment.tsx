"use client";
import { useState, FormEvent, useContext } from "react";
import { FormData, FormErrors } from "@/models/alumno";

import { Button, Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { Alumno } from "@/models/alumno";
import { FormContext, ModalContext } from "./page";
import { Payment } from "@/models/payment";
import { usePaymentConcept } from "./concepto/hooks/usePayment";
import { paymentMethods } from "@/models/payment";

interface FormErrorsPayment {
  paymentConceptId: string;
  paymentMethod: string;
  total: string;
}

interface CreateAlumnoFormProps {
  addData: (formData: Payment) => void;
  updateData: (formData: Alumno) => void;
}

function CreatePayment({ addData, updateData }: CreateAlumnoFormProps) {
  const { conceptPayments } = usePaymentConcept();
  const { idAlumno, isCreate } = useContext(FormContext);
  const { onClose } = useContext(ModalContext);

  let initialValuePayment: Payment = {
    total: "",
    paymentMethod: "",
    alumnoId: 0,
    paymentConceptId: 0,
  };

  if (isCreate && idAlumno) {
    initialValuePayment = { ...initialValuePayment, alumnoId: idAlumno };
  }

  const [formData, setFormData] = useState<Payment>(initialValuePayment);

  const [errors, setErrors] = useState<FormErrorsPayment>({
    paymentConceptId: "",
    paymentMethod: "",
    total: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    const newErrors = validateForm();

    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      return;
    }
    console.log(formData, isCreate, idAlumno);
    if (isCreate && idAlumno) {
      await addData({ ...formData, alumnoId: idAlumno });
    } else {
      // await updateData({ ...formData, id: initialValueForm?.id });
    }

    onClose();
  };

  const validateForm = () => {
    const newErrors = {
      paymentConceptId: "",
      paymentMethod: "",
      total: "",
    };

    if (!formData.paymentConceptId) {
      newErrors.paymentConceptId = "Debe existir concepto de pago";
    }
    if (formData.paymentMethod === "") {
      newErrors.paymentMethod = "Método de pago es requerido";
    }
    if (formData.total === "") {
      newErrors.total = "Total es requerida";
    }

    return newErrors;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <div className="w-full flex gap-2">
          <Select
            label={`Concepto de pago ${errors.paymentConceptId && "(Requerido)"}`}
            placeholder="Seleccione"
            name="paymentConceptId"
            // value={Grade.GARDEN_3}
            value={formData.paymentConceptId}
            // defaultSelectedKeys={[formData.paymentConceptId]}
            onChange={(e) =>
              setFormData({
                ...formData,
                paymentConceptId: parseInt(e.target.value),
              })
            }
          >
            {conceptPayments?.map((concept) => (
              <SelectItem key={concept.id} value={concept.id}>
                {concept.name}
              </SelectItem>
            ))}
          </Select>

          <Select
            label={`Método de Pago ${errors.paymentMethod && "(Requerido)"}`}
            placeholder="Seleccione"
            name="paymentMethod"
            value={formData.paymentMethod}
            // defaultSelectedKeys={[formData.paymentMethod]}
            onChange={(e) =>
              setFormData({ ...formData, paymentMethod: e.target.value })
            }
          >
            {paymentMethods.map((method) => (
              <SelectItem key={method} value={method}>
                {method}
              </SelectItem>
            ))}
          </Select>
        </div>

        <Input
          type="number"
          name="total"
          label={`Total ${errors.total && "(Requerido)"}`}
          value={formData.total}
          onChange={(e) => setFormData({ ...formData, total: e.target.value })}
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
            {isCreate ? "Crear" : "Actualizar"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default CreatePayment;

"use client";
import { useState, FormEvent, useContext, useEffect } from "react";

import { Button, DateValue, Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { Alumno } from "@/models/alumno";
import {
  ConceptPaymentSelectedContext,
  FormCreateEditContext,
  ModalCreatePaymentContext,
} from "./page";
import { Payment, PaymentConcept } from "@/models/payment";
import { usePaymentConcept } from "../../concepto/hooks/usePaymentConcept";
import { paymentMethods } from "@/models/payment";
import { DatePicker } from "@nextui-org/react";
import { CalendarDate, parseDate } from "@internationalized/date";

interface FormErrorsPayment {
  paymentConceptId: string;
  paymentMethod: string;
  codePayment: string;
  total: string;
}

interface CreateAlumnoFormProps {
  addPaymentAlumno: (formData: Payment, alumno: Required<Alumno>) => void;
}

function CreatePayment({ addPaymentAlumno }: CreateAlumnoFormProps) {
  const today = new Date();
  const todayDateValue: CalendarDate = parseDate(
    today.toISOString().split("T")[0],
  );

  const { conceptPayments } = usePaymentConcept();
  const conceptPaymentSelected: Required<PaymentConcept> | null = useContext(
    ConceptPaymentSelectedContext,
  );

  const { alumno, getAlumnoPayments } = useContext(FormCreateEditContext);
  const { onClose } = useContext(ModalCreatePaymentContext);

  let initialValuePayment: Payment = {
    total: "",
    paymentMethod: "",
    alumnoId: 0,
    codePayment: "",
    datePayment: today.toISOString(),
    comment: "",
    paymentConceptId: 0,
  };

  if (alumno?.id) {
    initialValuePayment = { ...initialValuePayment, alumnoId: alumno.id };
  }
  if (conceptPaymentSelected) {
    initialValuePayment = {
      ...initialValuePayment,
      paymentConceptId: conceptPaymentSelected.id,
      total: conceptPaymentSelected.total[0].toString(),
    };
  }

  const [formData, setFormData] = useState<Payment>(initialValuePayment);
  const [todayCalendar, setTodayCalendar] = useState<DateValue>(todayDateValue);

  const [errors, setErrors] = useState<FormErrorsPayment>({
    paymentConceptId: "",
    paymentMethod: "",
    codePayment: "",
    total: "",
  });

  // useEffect(() => {
  //   if (conceptPaymentSelected) {
  //     setFormData((prev: Payment) => ({
  //       ...prev,
  //       paymentConceptId: conceptPaymentSelected.id,
  //       total: conceptPaymentSelected.total[0].toString(),
  //     }));
  //   }
  // }, [conceptPaymentSelected]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      return;
    }
    if (alumno?.id) {
      await addPaymentAlumno(
        {
          ...formData,
          alumnoId: alumno.id,
        },
        alumno,
      );

      await getAlumnoPayments(alumno?.id);
    } else {
      // await updateData({ ...formData, id: initialValueForm?.id });
    }

    onClose();
  };

  const validateForm = () => {
    const newErrors: FormErrorsPayment = {
      paymentConceptId: "",
      paymentMethod: "",
      codePayment: "",
      total: "",
    };

    if (!formData.paymentConceptId) {
      newErrors.paymentConceptId = "Debe existir concepto de pago";
    }
    if (formData.paymentMethod === "") {
      newErrors.paymentMethod = "Método de pago es requerido";
    }
    if (formData.codePayment === "") {
      newErrors.codePayment = "Código es requerido";
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
          {conceptPayments.length > 0 && (
            <Select
              label={`Concepto de pago ${errors.paymentConceptId && "(Requerido)"}`}
              placeholder="Seleccione"
              name="paymentConceptId"
              value={formData.paymentConceptId.toString()}
              defaultSelectedKeys={[formData.paymentConceptId.toString()]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  paymentConceptId: parseInt(e.target.value),
                })
              }
            >
              {conceptPayments.map((concept) => (
                <SelectItem
                  key={concept.id.toString()}
                  value={concept.id.toString()}
                >
                  {concept.name}
                </SelectItem>
              ))}
            </Select>
          )}

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

        <div className="w-full flex gap-2">
          {/* <Input
            type="number"
            name="total"
            label={`Total ${errors.total && "(Requerido)"}`}
            value={formData.total}
            defaultValue={conceptPaymentSelected?.total}
            onChange={(e) =>
              setFormData({
                ...formData,
                total: e.target.value,
              })
            }
            disabled
          /> */}
          {conceptPaymentSelected && conceptPaymentSelected.total && (
            <Select
              label={`Total ${errors.total && "(Requerido)"}`}
              placeholder="Seleccione"
              name="total"
              value={formData.total}
              defaultSelectedKeys={[formData?.total]}
              // defaultSelectedKeys={[conceptPaymentSelected.total[0].toString()]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  total: e.target.value,
                })
              }
            >
              {conceptPaymentSelected.total.map((price) => (
                <SelectItem key={price.toString()} value={price.toString()}>
                  {price}
                </SelectItem>
              ))}
            </Select>
          )}
          <Input
            type="text"
            name="codePayment"
            label={`Código ${errors.codePayment && "(Requerido)"}`}
            value={formData.codePayment}
            onChange={(e) =>
              setFormData({ ...formData, codePayment: e.target.value })
            }
          />
        </div>

        <DatePicker
          label="Fecha de pago"
          value={todayCalendar}
          name="datePayment"
          onChange={(date) => {
            setTodayCalendar(date);
            setFormData({
              ...formData,
              datePayment: new Date(date.toString()).toISOString(),
            });
          }}
          className="w-full"
        />

        <Input
          type="text"
          name="comment"
          label={`Comentario`}
          value={formData.comment}
          onChange={(e) =>
            setFormData({ ...formData, comment: e.target.value })
          }
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
            Crear nuevo pago
          </Button>
        </div>
      </div>
    </form>
  );
}

export default CreatePayment;

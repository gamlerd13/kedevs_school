"use client";
import { useState, FormEvent, useContext, useEffect } from "react";

import { Button, DateValue, Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { Alumno } from "@/models/alumno";
import {
  ConceptPaymentSelectedContext,
  FormCreateEditContext,
  ModalCreateUpdatePaymentContext,
  paymentSelectedContext,
} from "./page";
import {
  Payment,
  PaymentConcept,
  PaymentIncludePaymentConcept,
} from "@/models/payment";
import { usePaymentConcept } from "../../concepto/hooks/usePaymentConcept";
import { paymentMethods } from "@/models/payment";
import { DatePicker } from "@nextui-org/react";
import { CalendarDate, parseDate } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";

interface FormErrorsPayment {
  paymentConceptId: string;
  paymentMethod: string;
  codePayment: string;
  total: string;
}

interface UpdateAlumnoFormProps {
  updatePaymentAlumno: (formDataUpdate: Required<Payment>) => void;
}

function UpdatePayment({ updatePaymentAlumno }: UpdateAlumnoFormProps) {
  const today = new Date();
  let dayDateValue: CalendarDate = parseDate(today.toISOString().split("T")[0]); //"2024-09-01"

  const { conceptPayments } = usePaymentConcept();
  const conceptPaymentSelected: Required<PaymentConcept> | null = useContext(
    ConceptPaymentSelectedContext,
  );
  const paymentSelected: PaymentIncludePaymentConcept | null = useContext(
    paymentSelectedContext,
  );

  const { alumno, getAlumnoPayments } = useContext(FormCreateEditContext);
  const { onClose } = useContext(ModalCreateUpdatePaymentContext);

  let initialValuePayment: Required<Payment> = {
    id: 0,
    total: "",
    paymentMethod: "",
    alumnoId: 0,
    codePayment: "",
    datePayment: today.toISOString(),
    comment: "",
    paymentConceptId: 0,
  };
  if (paymentSelected) {
    initialValuePayment = {
      id: paymentSelected.id,
      total: paymentSelected.total,
      paymentMethod: paymentSelected.paymentMethod,
      alumnoId: paymentSelected.alumnoId,
      codePayment: paymentSelected.codePayment,
      datePayment: paymentSelected.datePayment, //'2024-09-01T00:00:00.000Z'
      comment: paymentSelected.comment,
      paymentConceptId: paymentSelected.paymentConceptId,
    };
    const dateValue: Date = new Date(
      paymentSelected.datePayment,
    ) as unknown as Date;
    dayDateValue = parseDate(dateValue.toISOString().split("T")[0]);
  }

  const [formData, setFormData] =
    useState<Required<Payment>>(initialValuePayment);
  const [dayCalendar, setDayCalendar] = useState<DateValue>(dayDateValue);

  const [errors, setErrors] = useState<FormErrorsPayment>({
    paymentConceptId: "",
    paymentMethod: "",
    codePayment: "",
    total: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      return;
    }
    await updatePaymentAlumno(formData);

    //This is already handle in updatePayment
    if (alumno?.id) {
      await getAlumnoPayments(alumno?.id);
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
        {conceptPayments.length > 0 && (
          <>
            <div className="w-full flex gap-2">
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
                isDisabled={true}
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

              <Select
                label={`Método de Pago ${errors.paymentMethod && "(Requerido)"}`}
                placeholder="Seleccione"
                name="paymentMethod"
                value={formData.paymentMethod}
                defaultSelectedKeys={[formData.paymentMethod]}
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
              {conceptPaymentSelected && conceptPaymentSelected.total && (
                <Select
                  label={`Total ${errors.total && "(Requerido)"}`}
                  placeholder="Seleccione"
                  name="total"
                  value={formData.total}
                  defaultSelectedKeys={[formData.total]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      total: e.target.value,
                    })
                  }
                >
                  {conceptPaymentSelected &&
                    conceptPaymentSelected.total.map((total) => (
                      <SelectItem
                        key={total.toString()}
                        value={total.toString()}
                      >
                        {total}
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
          </>
        )}
        <I18nProvider locale="es">
          <DatePicker
            label="Fecha de pago"
            value={dayCalendar}
            name="datePayment"
            onChange={(date) => {
              setDayCalendar(date);
              setFormData({
                ...formData,
                datePayment: new Date(date.toString()).toISOString(),
              });
            }}
            className="w-full"
          />
        </I18nProvider>

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
            Actualizar pago
          </Button>
        </div>
      </div>
    </form>
  );
}

export default UpdatePayment;

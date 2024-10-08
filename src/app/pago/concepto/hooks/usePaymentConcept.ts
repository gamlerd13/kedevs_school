import axios from "axios";
import { useEffect, useState } from "react";
import { PaymentConcept, PaymentConceptForm } from "@/models/payment";
import { FormDataPaymentConcept } from "@/models/payment";
import { toast } from "sonner";
interface PaymentConceptHook {
  conceptPayments: Required<PaymentConcept>[];
  getData: () => void;
  addData: (formData: PaymentConceptForm) => void;
  updateData: (formData: Required<PaymentConceptForm>) => void;
  deleteData: (idPaymentConcept: number) => void;
}

export const usePaymentConcept = (): PaymentConceptHook => {
  const [conceptPayments, setConceptPayments] = useState<
    Required<PaymentConcept>[]
  >([]);
  const [updateCount, setUpdateCount] = useState<number>(0);

  const getData = async () => {
    try {
      const { data, status } = await axios.get("/api/paymentConcept");
      if (status == 200) {
        setConceptPayments(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addData = async (formData: PaymentConceptForm) => {
    try {
      const { data, status } = await axios.post(
        "/api/paymentConcept",
        formData,
      );
      if (status == 201) {
        setUpdateCount((prev) => prev + 1);
        getData();
      }
      if (!data) {
        return;
      }
      toast.success("Concepto de pago creado satisfactoriamente");
      return data;
    } catch (error) {
      console.log(error);
      toast.error("Hubo un error al intentar crear Concepto de pago");
    }
  };

  const updateData = async (formData: Required<PaymentConceptForm>) => {
    try {
      const { data, status } = await axios.put(
        // `/api/paymentConcept/${formData.id}`, // with id
        "/api/paymentConcept",
        formData,
      );
      if (status == 200) {
        getData();
      }
      if (!data) {
        return;
      }
      toast.success("Concepto de pago actualizado satisfactoriamente");
      return data;
    } catch (error) {
      console.log(error);
      toast.error("Hubo un error al intentar actualizar Concepto de pago");
    }
  };

  const deleteData = async (idPaymentConcept: number) => {
    try {
      const { status, data } = await axios.delete(
        `/api/paymentConcept/${idPaymentConcept}`,
      );
      console.log(status, data);
      if (status === 204) {
        getData();
      }
      toast.success("Concepto de pago eliminado satisfactoriamente");
    } catch (error) {
      toast.error("Hubo un error al intentar eliminar Concepto de pago");
    }
  };

  useEffect(() => {
    getData();
  }, [updateCount]);

  return {
    conceptPayments,
    getData,
    addData,
    updateData,
    deleteData,
  };
};

import axios from "axios";
import { useEffect, useState } from "react";
import { PaymentConcept } from "@/models/payment";
import { FormDataPaymentConcept } from "@/models/payment";
import { toast } from "sonner";
interface PaymentConceptHook {
  conceptPayments: PaymentConcept[];
  getData: () => void;
  addData: (formData: FormDataPaymentConcept) => void;
  updateData: (formData: PaymentConcept) => void;
}

export const usePaymentConcept = (): PaymentConceptHook => {
  const [conceptPayments, setConceptPayments] = useState<PaymentConcept[]>([]);
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

  const addData = async (formData: FormDataPaymentConcept) => {
    try {
      const { data, status } = await axios.post(
        "/api/paymentConcept",
        formData,
      );
      // console.log(data);
      if (status == 201) {
        console.log("Se deberia llamar y actualizar la lista");
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

  const updateData = async (formData: PaymentConcept) => {
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

  useEffect(() => {
    getData();
  }, [updateCount]);

  return {
    conceptPayments,
    getData,
    addData,
    updateData,
  };
};

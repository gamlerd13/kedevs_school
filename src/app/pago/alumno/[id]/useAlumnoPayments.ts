import axios from "axios";
import { useEffect, useState } from "react";
import { Payment, PaymentConcept } from "@/models/payment";
import { toast } from "sonner";
import useAxiosErrorHandler from "@/hooks/handleAxiosError";
import { Alumno } from "@/models/alumno";

interface PaymentConceptHook {
  getData: (idAlumno: number) => void;
  addData: (formData: Payment) => void;

  payments: Payment[];
  //   addData: (formData: FormDataPaymentConcept) => void;
  //   updateData: (formData: PaymentConcept) => void;
}

export const useAlumnoPayment = (): PaymentConceptHook => {
  const { handleAxiosError } = useAxiosErrorHandler();
  const [payments, setPayments] = useState<Required<Payment>[]>([]);

  const getData = async (idAlumno: number) => {
    try {
      const { data, status } = await axios.get(`/api/payment/${idAlumno}`);
      if (status == 200) {
        setPayments(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addData = async (formData: Payment) => {
    try {
      const response = await axios.post("/api/payment/", formData);
      if (response.status == 201) {
        toast.success("Pago realizado Exitosamente");
        // getData();
      }
    } catch (error) {
      handleAxiosError(error, "Pagos", "Crear");
    }
  };

  return {
    payments,
    getData,
    addData,
  };
};

import axios from "axios";
import { useEffect, useState } from "react";
import { Payment, PaymentConcept } from "@/models/payment";

interface PaymentConceptHook {
  getData: (idAlumno: number) => void;
  payments: Payment[];
  //   addData: (formData: FormDataPaymentConcept) => void;
  //   updateData: (formData: PaymentConcept) => void;
}

export const useAlumnoPayment = (): PaymentConceptHook => {
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

  return {
    payments,
    getData,
  };
};

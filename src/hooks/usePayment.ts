import axios from "axios";
import { useEffect, useState } from "react";
import { Payment, PaymentConcept } from "@/models/payment";

interface PaymentConceptHook {
  getData: () => void;
  payments: Payment[];
  //   addData: (formData: FormDataPaymentConcept) => void;
  //   updateData: (formData: PaymentConcept) => void;
}

export const usePayment = (): PaymentConceptHook => {
  const [payments, setPayments] = useState<Required<Payment>[]>([]);

  const getData = async () => {
    try {
      const { data, status } = await axios.get("/api/payment");
      if (status == 200) {
        setPayments(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    payments,
    getData,
  };
};

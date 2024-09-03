import axios from "axios";
import { useEffect, useState } from "react";
import { Payment, PaymentConcept } from "@/models/payment";
import { toast } from "sonner";
import useAxiosErrorHandler from "@/hooks/handleAxiosError";
import { Alumno } from "@/models/alumno";
import { useThermalPrinterPayment } from "./useThermalPrinterPayment";
import { useParams } from "next/navigation";
import { PaymentIncludePaymentConcept } from "@/models/payment";

interface PaymentConceptHook {
  getData: (idAlumno: number) => void;
  addData: (formData: Payment) => void;

  payments: PaymentIncludePaymentConcept[];
  //   addData: (formData: FormDataPaymentConcept) => void;
  updateData: (formDataUpdate: Required<Payment>) => void;
  deleteData: (idPayment: number | null) => void;
}

export const useAlumnoPayment = (): PaymentConceptHook => {
  const { handleAxiosError } = useAxiosErrorHandler();
  const { id }: { id: string } = useParams();

  const [payments, setPayments] = useState<PaymentIncludePaymentConcept[]>([]);

  const getData = async (idAlumno: number) => {
    try {
      const { data, status } = await axios.get(
        `/api/payment/alumno/${idAlumno}`,
      );
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
        if (id) {
          await getData(parseInt(id));
        }
      }
    } catch (error) {
      handleAxiosError(error, "Pagos", "Crear");
    }
  };

  const updateData = async (formDataUpdate: Required<Payment>) => {
    try {
      const response = await axios.put(
        `/api/payment/${formDataUpdate.id}`,
        formDataUpdate,
      );
      if (response.status == 201) {
        toast.success("Pago actualizado Exitosamente");
        if (id) {
          await getData(parseInt(id));
        }
      }
    } catch (error) {
      handleAxiosError(error, "Pagos", "Actualizar");
    }
  };

  const deleteData = async (idPayment: number | null) => {
    try {
      if (!idPayment) {
        throw Error("Erro");
      }
      const { status } = await axios.delete(`/api/payment/${idPayment}`);

      if (status === 201) {
        toast.success("Pago eliminado Exitosamente");
        if (id) {
          await getData(parseInt(id));
        }
      }
    } catch (error) {
      handleAxiosError(error, "Pagos", "Crear");
    }
  };

  useEffect(() => {
    if (id) {
      getData(parseInt(id));
    }
  }, [id]);
  return {
    payments,
    getData,
    addData,
    updateData,
    deleteData,
  };
};

"use client";
import { cache, useEffect, useState } from "react";
import axios from "axios";
import { Alumno } from "@/models/alumno";
import { toast } from "sonner";

import { Payment } from "@/models/payment";
import useAxiosErrorHandler from "@/hooks/handleAxiosError";
import { useIngresos } from "./useIngresos";

export interface DataFetch<T> {
  // data: T[] | null;
  data: T[];
  isLoading: Boolean;
  error: Error | null;
  getData: () => void;
  addData: (formData: Payment) => void;
  updateData: (formData: Alumno) => void;
}

export default function useAlumnoPayment<T>(): DataFetch<T> {
  const { getIngresos } = useIngresos();
  const [data, setData] = useState<T[]>([]);

  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const { handleAxiosError } = useAxiosErrorHandler();

  const getData = cache(async () => {
    try {
      // const res2 = await axios.get(
      //   `/api/alumnoLastPayment?timestamp=${new Date().getTime()}`,
      //   {
      //     headers: {
      //       "Cache-Control": "no-cache",
      //       Pragma: "no-cache",
      //       Expires: "0",
      //     },
      //   },
      // );

      const res = await fetch(
        `/api/alumnoLastPayment?timestamp=${new Date().getTime()}`,
        { next: { revalidate: 3600 } },
      );
      const data = await res.json();
      if (res.status === 200) {
        setIsLoading(false);
        setData(data);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error as Error);
    }
  });

  const addData = async (formData: Payment) => {
    try {
      const response = await axios.post("/api/payment/", formData);
      if (response.status == 201) {
        toast.success("Pago realizado Exitosamente");
        getData();
        getIngresos();
      }
    } catch (error) {
      handleAxiosError(error, "Pagos", "Crear");
      // toast.success("Hubo un error al Pagar");
    }
  };

  const updateData = async (formData: Alumno) => {
    try {
      const response = await axios.put("/api/alumno/", formData);
      if (response.status == 200) {
        toast.success("Alumno actualizado con éxito");
        getData();
        getIngresos();
      }
    } catch (error) {
      toast.success("Hubo un error al actualizar Alumno");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    getData,
    addData,
    updateData,
    data,
    isLoading,
    error,
  };
}

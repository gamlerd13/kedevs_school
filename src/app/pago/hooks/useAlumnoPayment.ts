"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Alumno } from "@/models/alumno";
import { toast } from "sonner";

import { Payment } from "@/models/payment";

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
  const [data, setData] = useState<T[]>([]);

  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const getData = async () => {
    try {
      const res = await axios.get("/api/alumnoLastPayment");
      if (res.status === 200) {
        console.log("dentro del status 2000", res);

        setIsLoading(false);
        setData(res.data);
      }
      console.log(res);
    } catch (error) {
      setIsLoading(false);
      setError(error as Error);
      console.log("Eder hay un error!", error);
    }
  };

  const addData = async (formData: Payment) => {
    try {
      const response = await axios.post("/api/alumnoLastPayment/", formData);
      if (response.status == 201) {
        toast.success("Pago realizado Exitosamente");
        getData();
      }
    } catch (error) {
      toast.success("Hubo un error al crear Alumno");
      console.log(error);
    }
  };

  const updateData = async (formData: Alumno) => {
    console.log("Se va a actializar datos", formData);
    try {
      const response = await axios.put("/api/alumno/", formData);
      if (response.status == 200) {
        toast.success("Alumno actualizado con éxito");
        getData();
      }
    } catch (error) {
      toast.success("Hubo un error al actualizar Alumno");
      console.log(error);
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

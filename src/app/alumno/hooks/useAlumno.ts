"use client";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { DataFetch } from "@/models/main";
import { Alumno } from "@/models/alumno";
import { toast } from "sonner";
import useAxiosErrorHandler from "@/hooks/handleAxiosError";

import { FormData } from "@/models/alumno";

export default function useAlumno<T>(): DataFetch<T> {
  const [data, setData] = useState<T[]>([]);
  const { handleAxiosError } = useAxiosErrorHandler();

  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const getData = async () => {
    try {
      const res = await axios.get("/api/alumno");
      if (res.status === 200) {
        setIsLoading(false);
        setData(res.data);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error as Error);
      handleAxiosError(error, "Alumnos", "Obtener");
    }
  };

  const addData = async (formData: FormData) => {
    try {
      const { status } = await axios.post("/api/alumno/", formData);
      if (status == 201) {
        toast.success("Alumno creado con éxito");
        getData();
      }
    } catch (error) {
      handleAxiosError(error, "Alumno", "Crear");
    }
  };

  const updateData = async (formData: Alumno) => {
    try {
      const response = await axios.put("/api/alumno/", formData);
      if (response.status == 200) {
        toast.success("Alumno actualizado con éxito");
        getData();
      }
    } catch (error: unknown | Error | AxiosError) {
      handleAxiosError(error, "Alumno", "Actualizar");
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

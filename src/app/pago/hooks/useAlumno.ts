"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataFetch } from "@/models/main";
import { Alumno } from "@/models/alumno";
import { toast } from "sonner";

import { FormData } from "@/models/alumno";

export default function useAlumno<T>(): DataFetch<T> {
  const [data, setData] = useState<T[]>([]);

  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [update, setUpdate] = useState<boolean>(false);

  const getData = async () => {
    try {
      const res = await axios.get("/api/alumno");
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

  const addData = async (formData: FormData) => {
    try {
      const response = await axios.post("/api/alumno/", formData);
      if (response.statusText == "OK") {
        toast.success("Alumno creado con éxito");
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

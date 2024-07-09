import { useEffect, useState } from "react";
import axios from "axios";
import { DataFetch } from "@/models/main";
import { Alumno } from "@prisma/client";

export default function useAlumno<T>(): DataFetch<T> {
  const [data, setData] = useState<T[]>([]);

  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const getData = async () => {
    try {
      const res = await axios.get("/api/alumno");
      if (res.statusText === "OK") {
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

  useEffect(() => {
    getData();
  }, []);

  return {
    data,
    isLoading,
    error,
  };
}

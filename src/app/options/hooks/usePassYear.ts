import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import useAxiosErrorHandler from "@/hooks/handleAxiosError";
import { useState } from "react";
export const usePassYear = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { handleAxiosError } = useAxiosErrorHandler();
  const updateYearAlumno = async (password: string) => {
    setLoading(true);
    try {
      const { status, data } = await axios.post(
        "/api/year/passYear",
        // JSON.stringify(password),
        {
          password, //si le envias un objecto lo serializa a json, no pasa con otros tipos de datos
        },
      );

      if (status === 201) {
        toast.success(`Se actualizó el año de los alumnos, ${data.message}`);
      }
    } catch (error) {
      handleAxiosError(error, "Pasar de año", "");
    } finally {
      setLoading(false);
    }
  };

  return {
    updateYearAlumno,
    loading,
  };
};

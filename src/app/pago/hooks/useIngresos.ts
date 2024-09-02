import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useIngresos = () => {
  const [ingresos, setIngresos] = useState<number | null>(null);
  const getIngresos = async () => {
    try {
      const { status, data } = await axios.get("/api/ingresos");
      console.log(status, data);
      if (status === 200) {
        setIngresos(data);
      }
    } catch (error) {
      toast.error("Hubo un error al traer los ingresos de hoy");
    }
  };

  useEffect(() => {
    getIngresos();
  }, []);

  return { getIngresos, ingresos };
};

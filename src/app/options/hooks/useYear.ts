import { Year } from "@/models/main";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface SetFormDataYear {
  year: string;
}
interface UseYear {
  currentYear: Required<Year> | null;
  updateYear(formData: SetFormDataYear): void;
}

export const useYear = () => {
  const [currentYear, setCurrentYear] = useState<Required<Year> | null>(null);

  const getYear = async () => {
    try {
      const { data, status } = await axios.get("/api/year/");

      if (status === 200) {
        setCurrentYear(data);
      }
    } catch (error) {
      toast.error("hubo un error, intente más tarde");
    }
  };

  const updateYear = async (formData: SetFormDataYear) => {
    try {
      const { status } = await axios.post("/api/year/", formData);

      if (status === 201) {
        getYear();
        toast.success("Año establecido con éxito");
      }
    } catch (error) {
      toast.error("hubo un error al cambiar el año");
    }
  };

  useEffect(() => {
    getYear();
  }, []);

  return {
    currentYear,
    updateYear,
  };
};

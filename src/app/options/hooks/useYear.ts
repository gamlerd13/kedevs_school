import { Year } from "@/models/main";
import axios from "axios";
import { useEffect, useState } from "react";

interface UseYear {
  currentYear: Required<Year> | null;
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
      console.log("error in get year");
    }
  };

  useEffect(() => {
    getYear();
  }, []);

  return {
    currentYear,
  };
};

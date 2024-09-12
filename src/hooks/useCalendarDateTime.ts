import { useEffect, useState } from "react";
import { DateInput } from "@nextui-org/react"; // Asegúrate de importar el componente correcto
import { CalendarDateTime } from "@internationalized/date";

export const useCalendarDateTime = () => {
  const [currentDateTime, setCurrentDateTime] =
    useState<CalendarDateTime | null>(null);

  useEffect(() => {
    const now = new Date();
    const dateTime = new CalendarDateTime(
      now.getFullYear(),
      now.getMonth() + 1, // Los meses en JavaScript son base 0
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
    );
    setCurrentDateTime(dateTime);
  }, []);

  return {
    currentDateTime,
  };
};

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useIngresos = () => {
  const [ingresos, setIngresos] = useState<number | null>(null);
  const getIngresos = async () => {
    try {
      // const { status, data } = await axios.get(
      //   `/api/ingresos?timestamp=${new Date().getTime()}`,{
      //     headers: {
      //       'Cache-Control': 'no-cache', // Evita que el navegador almacene en caché la respuesta
      //       'Pragma': 'no-cache',
      //       'Expires': '0',
      //     },
      //   }
      // );
      // console.log(status, data);
      // if (status === 200) {
      //   setIngresos(data);
      // }

      const res = await fetch(`/api/ingresos?timestamp=${new Date().getTime()}`, { next: { revalidate: 0  }, cache:  'no-store'})
     
      const data = await res.json();
      if (res.status === 200) {
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

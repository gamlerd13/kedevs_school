import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const useAxiosErrorHandler = () => {
  const handleAxiosError = (error: unknown, instance: string, type: string) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 409:
            toast.error(
              `Error al ${type} ${instance}, ${error.response.data.error} `,
            );
            break;
          default:
            toast.error(
              `Error al ${type} ${instance}, ${error.response.data.error} `,
            );
            break;
        }
      } else {
        toast.error("Error de red o servidor no disponible");
      }
    } else if (error instanceof Error) {
      toast.error(`Error al ${type} ${instance}, ${error.message} `);
    } else {
      toast.error(`Hubo un error al ${type} ${instance}`);
    }
  };

  return { handleAxiosError };
};

export default useAxiosErrorHandler;

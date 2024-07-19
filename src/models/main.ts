import { FormData, Alumno } from "@/models/alumno";

export interface DataFetch<T> {
  // data: T[] | null;
  data: T[];
  isLoading: Boolean;
  error: Error | null;
  getData: () => void;
  addData: (formData: FormData) => void;
  updateData: (formData: Alumno) => void;
}

export type Credentials = {
  username: string;
  password: string;
};

// declare module "bcrypt" {
//   const bcrypt: any;
//   export default bcrypt;
// }

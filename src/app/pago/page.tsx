"use client";
import React, { createContext, useState } from "react";
import AlumnoListComponent from "./AlumnoList";
import NavBar from "@/components/NavBar";
import { useDisclosure } from "@nextui-org/react";
import TitlePage from "@/components/TitlePage";
import { Alumno, AlumnoList, FormData } from "@/models/alumno";
import ModalForm from "./ModalForm";
import useAlumno from "./hooks/useAlumno";

interface ModalContext {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
}

const initialModalContext: ModalContext = {
  isOpen: false,
  onOpen: () => {},
  onOpenChange: () => {},
  onClose: () => {},
};

interface CreateEditProps {
  isCreate: boolean;
  formData: Alumno | null;
}

interface FormContextType {
  isCreate: boolean;
  initialValueForm: Alumno | null;
  handleOpenModal: ({ isCreate, formData }: CreateEditProps) => void;
}

export const FormContext = createContext<FormContextType>({
  isCreate: true,
  initialValueForm: null,
  handleOpenModal: () => {},
});

export const ModalContext = createContext<ModalContext>(initialModalContext);

interface UseAlumnoContext {
  alumnos: AlumnoList[] | [];
  addData: (formData: FormData) => void;
  updateData: (formData: Alumno) => void;
}

export const UseAlumnoContext = createContext<UseAlumnoContext>({
  alumnos: [],
  addData: (formData: FormData) => {},
  updateData: () => {},
});

function Page() {
  const { data: alumnos, addData, updateData } = useAlumno<AlumnoList>();

  const [isCreate, setIsCreate] = useState<boolean>(true);
  const [initialValueForm, setInitialValueForm] = useState<Alumno | null>(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const onCloseModal = () => {
    setInitialValueForm(null);
    onClose();
  };

  const handleOpenModal = ({ isCreate, formData }: CreateEditProps) => {
    console.log(isCreate, formData);
    if (isCreate && !formData) {
      setIsCreate(true);
      setInitialValueForm(null);
    }
    if (!isCreate && formData) {
      setIsCreate(false);
      setInitialValueForm(formData);
    }
    onOpen();
  };
  return (
    <>
      <div className="w-full">
        <NavBar />
        <div className="sm:w-10/12 w-11/12  mx-auto flex flex-col">
          <TitlePage title="Pagos" />
          <ModalContext.Provider
            value={{ isOpen, onOpen, onOpenChange, onClose }}
          >
            <FormContext.Provider
              value={{ isCreate, initialValueForm, handleOpenModal }}
            >
              <UseAlumnoContext.Provider
                value={{ alumnos, addData, updateData }}
              >
                <AlumnoListComponent />
                <ModalForm />
              </UseAlumnoContext.Provider>
            </FormContext.Provider>
          </ModalContext.Provider>
        </div>
      </div>
    </>
  );
}

export default Page;

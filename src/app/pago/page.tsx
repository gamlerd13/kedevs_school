"use client";
import React, { createContext, useState } from "react";
import AlumnoListComponent from "./AlumnoList";
import NavBar from "@/components/NavBar";
import { useDisclosure } from "@nextui-org/react";
import TitlePage from "@/components/TitlePage";
import { Alumno, AlumnoList, FormData } from "@/models/alumno";
import ModalForm from "./ModalForm";
import useAlumnoPayment from "./hooks/useAlumnoPayment";
import { AlumnoPayment, Payment } from "@/models/payment";

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
  alumno: Alumno | null;
}

interface FormContextType {
  isCreate: boolean;
  alumno: Alumno | null;
  handleOpenModal: ({ isCreate, alumno }: CreateEditProps) => void;
}

export const FormContext = createContext<FormContextType>({
  isCreate: true,
  alumno: null,
  handleOpenModal: () => {},
});

export const ModalContext = createContext<ModalContext>(initialModalContext);

interface UseAlumnoContext {
  alumnos: AlumnoPayment[] | [];
  addData: (formData: Payment) => void;
  updateData: (formData: Alumno) => void;
}

export const UseAlumnoContext = createContext<UseAlumnoContext>({
  alumnos: [],
  addData: (formData: Payment) => {},
  updateData: () => {},
});

function Page() {
  const {
    data: alumnos,
    addData,
    updateData,
  } = useAlumnoPayment<AlumnoPayment>();

  const [isCreate, setIsCreate] = useState<boolean>(true);
  const [alumno, setAlumno] = useState<Alumno | null>(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleOpenModal = ({
    isCreate,
    alumno,
  }: {
    isCreate: boolean;
    alumno: Alumno | null;
  }) => {
    if (isCreate && alumno) {
      setIsCreate(true);
      setAlumno(alumno);
    }
    if (!isCreate) {
      setIsCreate(false);
      // setIdAlumno();
    }
    onOpen();
  };
  return (
    <>
      <div className="w-full">
        <div className="sm:w-10/12 w-11/12  mx-auto flex flex-col">
          <TitlePage title="Pagos" />
          <ModalContext.Provider
            value={{ isOpen, onOpen, onOpenChange, onClose }}
          >
            <FormContext.Provider value={{ isCreate, alumno, handleOpenModal }}>
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

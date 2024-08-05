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
  idAlumno: number | null;
}

interface FormContextType {
  isCreate: boolean;
  idAlumno: number | null;
  handleOpenModal: ({ isCreate, idAlumno }: CreateEditProps) => void;
}

export const FormContext = createContext<FormContextType>({
  isCreate: true,
  idAlumno: null,
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
  const [idAlumno, setIdAlumno] = useState<number | null>(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleOpenModal = ({
    isCreate,
    idAlumno,
  }: {
    isCreate: boolean;
    idAlumno: number | null;
  }) => {
    if (isCreate && idAlumno) {
      setIsCreate(true);
      setIdAlumno(idAlumno);
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
            <FormContext.Provider
              value={{ isCreate, idAlumno, handleOpenModal }}
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

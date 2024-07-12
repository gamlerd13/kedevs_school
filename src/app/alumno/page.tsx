"use client";
import React, { createContext } from "react";
import AlumnoListV2 from "./AlumnoListV2";
import CreateAlumnoForm from "./CreateAlumno";
import NavBar from "@/components/NavBar";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import TitlePage from "@/components/TitlePage";
type ModalContextType = () => void;

export const ModalCreateAlumnoContext = createContext<ModalContextType>(() => {
  throw new Error("ModalCreateAlumnoContext not provided");
});
// export const ModalCreateAlumnoContext = createContext<ModalContextType>(() => {
//   throw new Error("ModalCreateAlumnoContext not provided");
// });
function Page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="w-full">
        <NavBar />
        <div className="sm:w-10/12 w-11/12  mx-auto flex flex-col">
          <TitlePage title="Alumnos" />
          <ModalCreateAlumnoContext.Provider value={onOpen}>
            <div>
              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        Agregar Alumno
                      </ModalHeader>
                      <ModalBody>
                        <CreateAlumnoForm onClose={onClose} />
                      </ModalBody>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
            <AlumnoListV2 />
          </ModalCreateAlumnoContext.Provider>
        </div>
      </div>
    </>
  );
}

export default Page;

"use client";
import React from "react";
import AlumnoListV2 from "./AlumnoListV2";
import CreateAlumnoForm from "./CreateAlumno";
import NavBar from "@/components/NavBar";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Breadcrumb from "@/components/Breadcrumb";

function Page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="w-full">
        <NavBar />
        <div className="sm:w-10/12 w-11/12  mx-auto flex flex-col">
          <Breadcrumb nav={["Alumnos"]} />
          <div>
            <Button onPress={onOpen}>Agregar Alumno</Button>
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
        </div>
      </div>
    </>
  );
}

export default Page;

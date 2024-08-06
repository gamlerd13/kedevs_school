"use client";
import NavBar from "@/components/NavBar";
import TitlePage from "@/components/TitlePage";
import React, { useState } from "react";
import { usePaymentConcept } from "./hooks/usePaymentConcept";
import ListPaymentConcept from "./ListPaymentConcept";
import CreatePaymentConcept from "./CreatePaymentConcept";
import { PaymentConcept } from "@/models/payment";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { CiCirclePlus } from "react-icons/ci";

function Page() {
  const { conceptPayments, addData, updateData } = usePaymentConcept();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [dataEdit, setDataEdit] = useState<PaymentConcept | null>(null);
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onOpenChange: onOpenChangeEdit,
  } = useDisclosure();

  const handleEdit = (data: PaymentConcept) => {
    setDataEdit(data);
    onOpenEdit();
  };

  return (
    <>
      <div className="w-full">
        <div className="sm:w-10/12 w-11/12  mx-auto flex flex-col">
          <TitlePage title="Concepto de Pago" />

          {conceptPayments ? (
            <ListPaymentConcept
              onOpen={onOpen}
              handleEdit={handleEdit}
              conceptPayments={conceptPayments}
            />
          ) : (
            <div>cargando...</div>
          )}
        </div>
      </div>
      <div>
        {/* Modals here */}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Agregar Concepto de Pago
                </ModalHeader>
                <ModalBody>
                  <CreatePaymentConcept
                    create={true}
                    updateData={updateData}
                    onClose={onClose}
                    addData={addData}
                  />
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>

        <Modal isOpen={isOpenEdit} onOpenChange={onOpenChangeEdit}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Editar Concepto de Pago
                </ModalHeader>
                <ModalBody>
                  <CreatePaymentConcept
                    addData={addData}
                    create={false}
                    dataEdit={dataEdit}
                    updateData={updateData}
                    onClose={onClose}
                  />
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}

export default Page;

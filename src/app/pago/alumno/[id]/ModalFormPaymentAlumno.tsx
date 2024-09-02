"use client";
import { useContext } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { Divider } from "@nextui-org/divider";
import CreatePayment from "./CreatePayment";
import { FormCreateEditContext, ModalCreateUpdatePaymentContext } from "./page";
import UpdatePayment from "./UpdatePayment";

function ModalFormPaymentAlumno({ isEdit }: { isEdit: Boolean }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useContext(
    ModalCreateUpdatePaymentContext,
  );

  const { addPaymentAlumno, updatePaymentAlumno, alumno } = useContext(
    FormCreateEditContext,
  );

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <div className="flex flex-col w-full">
                <h1>{isEdit ? "Editar" : "Crear"} Pago</h1>
                <Divider />
                <span className="text-sm">{alumno?.fullName}</span>
                <span className="text-[12px] font-light">{alumno?.dni}</span>
              </div>
            </ModalHeader>
            <ModalBody>
              {isEdit ? (
                <UpdatePayment updatePaymentAlumno={updatePaymentAlumno} />
              ) : (
                <CreatePayment addPaymentAlumno={addPaymentAlumno} />
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ModalFormPaymentAlumno;

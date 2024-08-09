import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import React, { useContext } from "react";
import CreatePayment from "./CreatePayment";
import { FormCreateEditContext, ModalCreatePaymentContext } from "./page";

function ModalFormPaymentAlumno() {
  const { isOpen, onOpen, onOpenChange, onClose } = useContext(
    ModalCreatePaymentContext,
  );
  const { addPaymentAlumno, alumno } = useContext(FormCreateEditContext);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <div className="flex flex-col">
                <h1>Pago</h1>
                <span className="text-sm">{alumno?.fullName}</span>
                <span className="text-[12px] font-light">{alumno?.dni}</span>
              </div>
            </ModalHeader>
            <ModalBody>
              <CreatePayment addPaymentAlumno={addPaymentAlumno} />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ModalFormPaymentAlumno;

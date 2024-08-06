import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import React, { useContext } from "react";
import CreatePayment from "./CreatePayment";
import { FormContext, ModalContext, UseAlumnoContext } from "./page";

function ModalForm() {
  const { isOpen, onOpen, onOpenChange, onClose } = useContext(ModalContext);
  const { addData, updateData } = useContext(UseAlumnoContext);
  const { alumno } = useContext(FormContext);

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
              <CreatePayment addData={addData} updateData={updateData} />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ModalForm;

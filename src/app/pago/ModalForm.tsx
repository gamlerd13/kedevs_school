import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import React, { useContext } from "react";
import CreatePayment from "./CreatePayment";
import { ModalContext, UseAlumnoContext } from "./page";

function ModalForm() {
  const { isOpen, onOpen, onOpenChange, onClose } = useContext(ModalContext);
  const { addData, updateData } = useContext(UseAlumnoContext);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Pago</ModalHeader>
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

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function DeleteConfirm({
  idConceptPaymentDelete,
  deleteData,
  isOpen,
  onOpenChange,
}: {
  idConceptPaymentDelete: number | null;
  deleteData: (idPaymentConcept: number) => void;
  onOpenChange: () => void;
  isOpen: boolean;
}) {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirmar Eliminación
              </ModalHeader>
              <ModalBody>
                <p className="text-rose-500 text-sm">
                  ¿Está seguro de eliminar este concepto de pago ?, esto podría
                  eliminar los registros de pago existentes con respecto a este
                  concepto de pago.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                {idConceptPaymentDelete && (
                  <Button
                    color="danger"
                    onPress={() => {
                      deleteData(idConceptPaymentDelete);
                      onClose();
                    }}
                  >
                    Eliminar
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

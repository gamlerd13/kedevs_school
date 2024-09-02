"use client";
import React, { useState } from "react";
import { PaymentConcept } from "@/models/payment";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { CiCirclePlus } from "react-icons/ci";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import DeleteConfirm from "./modal/DeleteConfirm";
import { useDisclosure } from "@nextui-org/react";
function ListPaymentConcept({
  conceptPayments,
  onOpen,
  handleEdit,
  deleteData,
}: {
  conceptPayments: Required<PaymentConcept>[];
  onOpen: () => void;
  handleEdit: (data: PaymentConcept) => void;
  deleteData: (idPaymentConcept: number) => void;
}) {
  const {
    isOpen: isOpenModalDelete,
    onOpen: onOpenModalDelete,
    onOpenChange: onOpenChangeModalDelete,
  } = useDisclosure();
  const [idConceptPaymentDelete, setIdConceptPaymentDelete] = useState<
    number | null
  >(null);

  const handleDelete = (idConceptPayment: number) => {
    setIdConceptPaymentDelete(idConceptPayment);
    onOpenModalDelete();
  };
  return (
    <div
      className="grid gap-4 auto-rows-auto"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}
    >
      <DeleteConfirm
        idConceptPaymentDelete={idConceptPaymentDelete}
        deleteData={deleteData}
        isOpen={isOpenModalDelete}
        onOpenChange={onOpenChangeModalDelete}
      />

      <button className="h-full" onClick={onOpen}>
        <Card className="h-full hover:bg-default-400 pointer">
          <CardBody className="flex flex-col justify-center items-center">
            <h1 className="font-semibold">Agregar</h1>
            <CiCirclePlus className="text-4xl" />
          </CardBody>
        </Card>
      </button>

      {conceptPayments &&
        conceptPayments.map((conceptPayment, index) => (
          <Card key={conceptPayment.id} className="">
            <CardHeader>
              <h1 className="font-medium text-default-600">
                {conceptPayment.name}
              </h1>
            </CardHeader>
            <CardBody>
              {conceptPayment.total.map((price) => (
                <span key={price}> S/. {price}</span>
              ))}
            </CardBody>
            <CardFooter className="flex justify-between text-2xl">
              <button
                onClick={() =>
                  handleEdit({
                    id: conceptPayment.id,
                    name: conceptPayment.name,
                    total: conceptPayment.total,
                  })
                }
                className="rounded-full p-2 hover:bg-blue-600 hover:text-white"
              >
                <MdModeEditOutline />
              </button>
              <button
                onClick={() => handleDelete(conceptPayment.id)}
                className="rounded-full p-2 hover:bg-rose-600 hover:text-white"
              >
                <RiDeleteBinLine />
              </button>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}

export default ListPaymentConcept;

"use client";
import React from "react";
import { PaymentConcept } from "@/models/payment";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { CiCirclePlus } from "react-icons/ci";
import { MdModeEditOutline } from "react-icons/md";
// import { RiDeleteBinLine } from "react-icons/ri";

function ListPaymentConcept({
  conceptPayments,
  onOpen,
  handleEdit,
}: {
  conceptPayments: PaymentConcept[];
  onOpen: () => void;
  handleEdit: (data: PaymentConcept) => void;
}) {
  return (
    <div
      className="grid gap-4 auto-rows-auto"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}
    >
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
              <span> S/. {conceptPayment.total}</span>
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

              {/* Add delete logic in thi button ahead */}
              {/* <button className="rounded-full p-2 hover:bg-rose-600 hover:text-white">
                <RiDeleteBinLine />
              </button> */}
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}

export default ListPaymentConcept;

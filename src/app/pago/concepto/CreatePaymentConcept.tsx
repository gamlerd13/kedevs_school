"use client";
import { useState, FormEvent } from "react";

import { Button, Input } from "@nextui-org/react";
import {
  FormDataPaymentConcept,
  FormErrorsPaymentConcept,
  PaymentConceptForm,
} from "@/models/payment";
import axios from "axios";
import { toast } from "sonner";
import { usePaymentConcept } from "./hooks/usePaymentConcept";
import { PaymentConcept } from "@/models/payment";
import { PiPlusBold } from "react-icons/pi";
import { useInputPrices } from "./hooks/useInputPrices";
import { BsTrash } from "react-icons/bs";

function CreatePaymentConcept({
  onClose,
  create,
  dataEdit,
  addData,
  updateData,
}: {
  onClose: () => void;
  create: boolean;
  dataEdit?: PaymentConcept | null;
  addData: (formData: PaymentConceptForm) => void;
  updateData: (formData: Required<PaymentConceptForm>) => void;
}) {
  let defaultListPrices = [
    { id: 1, status: true, price: "" }, //this one,do not desapear
    { id: 2, status: false, price: "" },
    { id: 3, status: false, price: "" },
  ];
  let initialName: string = "";

  if (dataEdit) {
    initialName = dataEdit.name;

    if (dataEdit.total.length > 0) {
      defaultListPrices = defaultListPrices.map((price, index) => ({
        id: index + 1,
        status: dataEdit.total[index] ? true : false,
        price: dataEdit.total[index] ? dataEdit.total[index].toString() : "",
      }));
    }
  }

  const [listInputObjectPrices, setListInputObjectPrices] =
    useState(defaultListPrices);
  const [formDataName, setFormDataName] = useState<string>(initialName);

  const { addPrice, removePrice } = useInputPrices(
    listInputObjectPrices,
    setListInputObjectPrices,
  );
  const [errors, setErrors] = useState<FormErrorsPaymentConcept>({
    nameError: "",
    totalError: "",
  });

  // Handle onchangue in inputs
  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  // ) => {
  //   const { name, value, type } = e.target;
  //   const valueToUpdate = type === "number" ? parseFloat(value) : value;
  //   setFormData({
  //     ...formData,
  //     [name]: valueToUpdate,
  //   });
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      return;
    }

    if (create) {
      await addData({
        name: formDataName,
        total: listInputObjectPrices
          .filter((e) => e.status == true)
          .map((e) => e.price),
      });
    } else {
      if (dataEdit?.id) {
        await updateData({
          name: formDataName,
          id: dataEdit?.id,
          total: listInputObjectPrices
            .filter((e) => e.status == true)
            .map((e) => e.price),
        });
      }
    }

    onClose();
  };

  const validateForm = () => {
    const newErrors = {
      nameError: "",
      totalError: "",
    };
    if (formDataName.trim() === "") {
      newErrors.nameError = "nombre es requerido";
    }
    if (
      listInputObjectPrices.some(
        (priceObject) => priceObject.price.length < 0,
      ) ||
      !listInputObjectPrices
        .filter((e) => e.status == true)
        .every(
          (priceObject) =>
            parseFloat(priceObject.price).toString() === priceObject.price,
        )
    ) {
      newErrors.totalError = "Verificar precio e.j: 234.23";
    }
    return newErrors;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <Input
          type="text"
          name="name"
          label={`Nombre ${errors.nameError && "(Requerido)"}`}
          value={formDataName}
          onChange={(e) => setFormDataName(e.target.value)}
          placeholder="Pago Mes julio"
        />
        <div className="w-full flex justify-between">
          <h3 className="font-medium">Precios</h3>
          <div
            onClick={() => addPrice()}
            className="text-xl rounded-full bg-default flex justify-center items-center w-6 h-6 cursor-pointer"
          >
            <PiPlusBold />
          </div>
        </div>
        <div className="w-full flex flex-col gap-1">
          {/* <Input
            type="number"
            name="total"
            label={`Precio principal ${errors.totalError && "(Requerido y mayor que cero)"}`}
            value={formData.total.toString()}
            onChange={(e) =>
              setFormData({ ...formData, total: e.target.value })
            }
            placeholder="100.2"
          /> */}

          {listInputObjectPrices &&
            listInputObjectPrices
              .filter((objectPrice) => objectPrice.status === true)
              .map((inputPrice, index) => (
                <Input
                  key={inputPrice.id}
                  type="number"
                  label={`Precio ${inputPrice.id}`}
                  defaultValue={inputPrice.price}
                  value={inputPrice.price}
                  onChange={(e) =>
                    setListInputObjectPrices((prev) =>
                      prev.map((item) =>
                        item.id === inputPrice.id
                          ? { ...item, price: e.target.value }
                          : item,
                      ),
                    )
                  }
                  placeholder="100.45"
                  endContent={
                    <BsTrash
                      className="text-xl cursor-pointer m-1 hover:text-rose-600"
                      onClick={() => removePrice(inputPrice.id)}
                    />
                  }
                />
              ))}
        </div>

        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            color="danger"
            variant="light"
            onPress={onClose}
          >
            Cerrar
          </Button>
          <Button color="default" type="submit">
            Enviar
          </Button>
        </div>
      </div>
    </form>
  );
}

export default CreatePaymentConcept;

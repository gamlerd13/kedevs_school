import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

interface useInputProps {
  id: number;
  status: boolean;
  price: string;
}

export const useInputPrices = (
  listInputObjectPrices: useInputProps[],
  setListInputObjectPrices: Dispatch<SetStateAction<useInputProps[]>>,
) => {
  const addPrice = () => {
    const firtsPriceAvailable = listInputObjectPrices.find(
      (price) => price.status == false,
    );

    if (firtsPriceAvailable) {
      setListInputObjectPrices((prevValue) =>
        prevValue.map((price) =>
          price.id == firtsPriceAvailable.id
            ? { ...price, status: true }
            : price,
        ),
      );
    } else {
      toast.error("Maximo numero de precios");
    }
  };

  const removePrice = (idPrice: number) => {
    // if (idPrice == 1) {
    //   toast.error("Debe haber por lo menos 1 precio");
    //   return;
    // }
    if (listInputObjectPrices.filter((item) => item.status).length === 1) {
      toast.error("Debe haber por lo menos 1 precio");
      return;
    }

    setListInputObjectPrices((prevValue) =>
      prevValue.map((price) =>
        price.id == idPrice ? { ...price, status: false, price: "" } : price,
      ),
    );
  };
  return { addPrice, removePrice };
};

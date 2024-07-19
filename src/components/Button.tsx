import React from "react";
import { Button } from "@nextui-org/react";
import PlusIcon from "./icons/xl/PlusIcon";

interface ButtonSubmitProps {
  text?: string;
  action?: () => void;
}

export default function ButtonSubmit({ text, action }: ButtonSubmitProps) {
  return (
    <Button onClick={action} color="default" type="submit">
      {text ? text : "Enviar"}
    </Button>
  );
}

export const ButtonCreateInstance = ({
  handleClick,
}: {
  handleClick: () => void;
}) => {
  return (
    <Button onPress={handleClick} color="primary" endContent={<PlusIcon />}>
      Agregar
    </Button>
  );
};

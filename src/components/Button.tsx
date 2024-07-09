import React from "react";
import { Button } from "@nextui-org/react";

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

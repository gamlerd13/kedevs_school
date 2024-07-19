import { Tooltip } from "@nextui-org/react";
import React from "react";
import { FaEdit } from "react-icons/fa";

export function ToolTipEdit({ name }: { name: string }) {
  return (
    <Tooltip
      content={`Editar: ${name}`}
      className="px-2"
      delay={0}
      closeDelay={0}
      offset={-4}
    >
      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
        <FaEdit />
      </span>
    </Tooltip>
  );
}

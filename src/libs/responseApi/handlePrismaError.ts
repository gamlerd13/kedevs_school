import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

const handlePrismaError = (error: unknown) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      const conflictFields: string[] = Array.isArray(error.meta?.target)
        ? error.meta.target
        : [];
      let message = `Campos repetidos: ${conflictFields.join(", ")}`;
      return NextResponse.json({ error: message }, { status: 409 });
    }

    // Puedes manejar otros códigos de error aquí
    // Ejemplo: if (error.code === "P2025") { ... }
  }

  // Maneja errores genéricos o desconocidos
  let message = error instanceof Error ? error.message : "Error desconocido";

  return NextResponse.json({ error: message }, { status: 500 });
};

export default handlePrismaError;

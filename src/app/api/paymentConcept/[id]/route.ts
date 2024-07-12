import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";
import prisma from "@/libs/db";
import { FormDataPaymentConcept } from "@/models/payment";

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    // throw new Error("Error forzado para pruebas");
    const body: FormDataPaymentConcept = await req.json();
    const { name, total } = body;
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) throw new Error("No hay Id");

    const updatedPaymentConcept = await prisma.paymentConcept.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        total,
      },
    });

    // const newPaymentConcept = false;
    if (!updatedPaymentConcept) {
      throw new Error("No se pudo actualizar el concepto de pago");
    }
    return NextResponse.json(updatedPaymentConcept, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

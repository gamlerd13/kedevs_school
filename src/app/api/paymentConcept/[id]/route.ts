import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import { FormDataPaymentConcept } from "@/models/payment";
import handlePrismaError from "@/libs/responseApi/handlePrismaError";

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const body: FormDataPaymentConcept = await req.json();
    const { name, total } = body;
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) throw new Error("No existe Id de concepto de pago");

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
    return handlePrismaError(error);
  }
}

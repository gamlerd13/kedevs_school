import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import { PaymentPost } from "@/models/payment";
import { PaymentConcept } from "@prisma/client";
import handlePrismaError from "@/libs/responseApi/handlePrismaError";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body: PaymentPost = await req.json();
    const { alumnoId, paymentConceptId, total, paymentMethod } = body;

    const newPaymentConcept = await prisma.payment.create({
      data: {
        alumnoId,
        paymentConceptId,
        total,
        paymentMethod,
      },
    });
    if (!newPaymentConcept) {
      throw Error("Ocurrio un error");
    }
    return NextResponse.json(newPaymentConcept, { status: 201 });
  } catch (error) {
    return handlePrismaError(error);
  }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import { FormDataPaymentConcept, Payment } from "@/models/payment";
import { PaymentConcept } from "@prisma/client";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body: Payment = await req.json();
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
    }
    return NextResponse.json(newPaymentConcept, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

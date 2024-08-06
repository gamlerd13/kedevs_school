import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import { PaymentPost } from "@/models/payment";
import { PaymentConcept } from "@prisma/client";
import handlePrismaError from "@/libs/responseApi/handlePrismaError";

export async function GET(req: NextRequest) {
  try {
    const payments = await prisma.payment.findMany({
      orderBy: {
        datePayment: "desc",
      },
    });
    if (!payments) {
      throw new Error("No se pudo obtener los pagos");
    }
    return NextResponse.json(payments, { status: 200 });
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body: PaymentPost = await req.json();
    const { alumnoId, paymentConceptId, paymentMethod, total, comment } = body;

    const newPayment = await prisma.payment.create({
      data: {
        alumnoId,
        paymentConceptId,
        paymentMethod,
        total,
        comment,
      },
    });
    if (!newPayment) {
      throw new Error("No se pudo crear el pago");
    }
    return NextResponse.json(newPayment, { status: 201 });
  } catch (error) {
    return handlePrismaError(error);
  }
}

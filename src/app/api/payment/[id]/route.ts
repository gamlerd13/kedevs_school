import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import { Payment } from "@/models/payment";
import { PaymentConcept, Year } from "@prisma/client";
import handlePrismaError from "@/libs/responseApi/handlePrismaError";
import { PaymentMethod } from "@prisma/client";
// import { getCurrentYear } from "@/libs/year";

interface Params {
  params: { id: string };
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    // Year isn't nessesary just cuz payment is already working with current year
    //let currentYear: Year | null = await getCurrentYear();
    //if (!currentYear) throw new Error("Error en establecer año");

    const body: Required<Payment> = await req.json();
    const {
      alumnoId,
      paymentConceptId,
      paymentMethod,
      total,
      comment,
      codePayment,
      datePayment,
    } = body;

    const idPayment = parseInt(params.id);
    const payments = await prisma.payment.update({
      where: {
        id: idPayment,
      },

      data: {
        alumnoId,
        paymentConceptId,
        paymentMethod: paymentMethod as PaymentMethod,
        total,
        comment,
        codePayment,
        datePayment,
      },
    });
    if (!payments) {
      throw new Error("No se pudo actualizar pago");
    }
    return NextResponse.json(payments, { status: 201 });
  } catch (error) {
    return handlePrismaError(error);
  }
}

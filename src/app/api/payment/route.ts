import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import { PaymentPost } from "@/models/payment";
import handlePrismaError from "@/libs/responseApi/handlePrismaError";
import { getCurrentYear } from "@/libs/year";
import { Year } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    let currentYear: Year | null = await getCurrentYear();
    if (!currentYear) throw new Error("Error en establecer año");

    const payments = await prisma.payment.findMany({
      where: {
        yearId: currentYear.id,
      },
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
    let currentYear: Year | null = await getCurrentYear();
    if (!currentYear) throw new Error("Error en establecer año");

    const body: PaymentPost = await req.json();
    const {
      alumnoId,
      paymentConceptId,
      paymentMethod,
      total,
      comment,
      codePayment,
      datePayment,
    } = body;

    let newDatePayment = datePayment;
    if (!datePayment || isNaN(new Date(datePayment).getTime())) {
      newDatePayment = new Date().toISOString();
    }
    const totalPeruvianCurrency = parseFloat(total).toFixed(2);
    const newPayment = await prisma.payment.create({
      data: {
        alumnoId,
        paymentConceptId,
        codePayment,
        paymentMethod,
        total: totalPeruvianCurrency,
        comment,
        datePayment: newDatePayment,
        yearId: currentYear.id,
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

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import { PaymentPost } from "@/models/payment";
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
    const totalPeruvianCurrency = parseFloat(total).toLocaleString("es-PE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const newPayment = await prisma.payment.create({
      data: {
        alumnoId,
        paymentConceptId,
        codePayment,
        paymentMethod,
        total: totalPeruvianCurrency,
        comment,
        datePayment: newDatePayment,
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

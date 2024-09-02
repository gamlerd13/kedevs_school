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

    let codigoCorrelativo: string = "000001"; // max 6 length
    let correlativeCode = await prisma.correlativeCode.findFirst();
    if (correlativeCode) {
      const valueSize = correlativeCode.nextValue.toString().length;
      codigoCorrelativo =
        codigoCorrelativo.slice(0, -valueSize) +
        correlativeCode.nextValue.toString();
    } else {
      //create firts
      correlativeCode = await prisma.correlativeCode.create({
        data: {
          nextValue: 1,
        },
      });
    }

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
        correlativeCode: codigoCorrelativo,
      },
    });
    if (!newPayment) {
      throw new Error("No se pudo crear el pago");
    }

    //update correlative
    if (correlativeCode) {
      await prisma.correlativeCode.update({
        where: {
          id: correlativeCode.id,
        },
        data: {
          nextValue: correlativeCode.nextValue + 1,
        },
      });
    }

    return NextResponse.json(newPayment, { status: 201 });
  } catch (error) {
    return handlePrismaError(error);
  }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import { Prisma } from "@prisma/client";
import { FormDataPaymentConcept } from "@/models/payment";
import { PaymentConcept } from "@prisma/client";
import handlePrismaError from "@/libs/responseApi/handlePrismaError";

export async function GET() {
  try {
    const payments = await prisma.paymentConcept.findMany({
      orderBy: {
        id: "desc",
      },
    });
    if (!payments) {
      throw new Error("No se pudo crear obtener alumnos");
    }
    return NextResponse.json(payments, { status: 200 });
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // throw new Error("Error forzado para pruebas");
    const body: FormDataPaymentConcept = await req.json();
    const { name, total } = body;
    const totalPeruvianCurrency = parseFloat(total).toLocaleString("es-PE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const newPaymentConcept = await prisma.paymentConcept.create({
      data: {
        name,
        total: totalPeruvianCurrency,
      },
    });
    if (!newPaymentConcept) {
      throw new Error("No se pudo crear el concepto de pago");
    }
    return NextResponse.json(newPaymentConcept, { status: 201 });
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { name, total, id } = body;
    const totalPeruvianCurrency = parseFloat(total).toLocaleString("es-PE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const updatedPaymentConcept = await prisma.paymentConcept.update({
      where: {
        id: id,
      },
      data: {
        name,
        total: totalPeruvianCurrency,
      },
    });

    if (!updatedPaymentConcept) {
      throw new Error("No se pudo actualizar el concepto de pago");
    }
    return NextResponse.json(updatedPaymentConcept, { status: 200 });
  } catch (error) {
    return handlePrismaError(error);
  }
}

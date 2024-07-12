import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import { FormDataPaymentConcept } from "@/models/payment";
import { PaymentConcept } from "@prisma/client";

export async function GET() {
  try {
    const payments = await prisma.paymentConcept.findMany();
    if (!payments) {
      throw new Error("No se pudo crear obtener alumnos");
    }
    return NextResponse.json(payments, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // throw new Error("Error forzado para pruebas");
    const body: FormDataPaymentConcept = await req.json();
    const { name, total } = body;

    const newPaymentConcept = await prisma.paymentConcept.create({
      data: {
        name,
        total,
      },
    });
    // const newPaymentConcept = false;
    if (!newPaymentConcept) {
      console.log("va  a haber un error");
      throw new Error("No se pudo crear el concepto de pago");
    }
    return NextResponse.json(newPaymentConcept, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    // throw new Error("Error forzado para pruebas");
    const body: PaymentConcept = await req.json();
    const { name, total, id } = body;

    const updatedPaymentConcept = await prisma.paymentConcept.update({
      where: {
        id: id,
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

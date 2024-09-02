import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import { FormDataPaymentConcept, PaymentConceptForm } from "@/models/payment";
import handlePrismaError from "@/libs/responseApi/handlePrismaError";

interface Params {
  params: { id: string };
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const body: PaymentConceptForm = await req.json();
    const { name, total } = body;
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) throw new Error("No existe Id de concepto de pago");

    const totalPeruvianCurrency = total.map((price) =>
      parseFloat(price).toFixed(2),
    );
    const updatedPaymentConcept = await prisma.paymentConcept.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        total: totalPeruvianCurrency,
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

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const idPayment = parseInt(params.id);
    const payments = await prisma.paymentConcept.delete({
      where: {
        id: idPayment,
      },
    });
    if (!payments) {
      throw new Error("No se pudo eliminar concepto de pago");
    }
    console.log(payments);
    return new NextResponse(null, { status: 204 }); //check this
  } catch (error) {
    return handlePrismaError(error);
  }
}

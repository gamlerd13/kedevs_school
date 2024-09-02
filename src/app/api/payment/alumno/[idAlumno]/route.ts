import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import { PaymentPost } from "@/models/payment";
import { PaymentConcept, Year } from "@prisma/client";
import handlePrismaError from "@/libs/responseApi/handlePrismaError";
import { getCurrentYear } from "@/libs/year";

interface Params {
  params: { idAlumno: string };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    let currentYear: Year | null = await getCurrentYear();
    if (!currentYear) throw new Error("Error en establecer año");

    const idAlumno = parseInt(params.idAlumno);
    const payments = await prisma.payment.findMany({
      where: {
        alumnoId: idAlumno,
        yearId: currentYear.id,
      },
      include: {
        paymentConcept: true,
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

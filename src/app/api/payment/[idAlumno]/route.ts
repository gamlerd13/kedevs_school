import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import { PaymentPost } from "@/models/payment";
import { PaymentConcept } from "@prisma/client";
import handlePrismaError from "@/libs/responseApi/handlePrismaError";

interface Params {
  params: { idAlumno: string };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const idAlumno = parseInt(params.idAlumno);
    const payments = await prisma.payment.findMany({
      where: {
        alumnoId: idAlumno,
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

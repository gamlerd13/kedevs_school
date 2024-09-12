import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import handlePrismaError from "@/libs/responseApi/handlePrismaError";
import { IncomeFrequency, IncomeGet, RangeDate } from "@/models/Income";

export async function POST(req: NextRequest) {
  try {
    const body: RangeDate = await req.json();

    const startOfDay = new Date(
      parseInt(body.initialDate.year),
      parseInt(body.initialDate.month) - 1,
      parseInt(body.initialDate.day),
    );
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(
      parseInt(body.finalDate.year),
      parseInt(body.finalDate.month) - 1,
      parseInt(body.finalDate.day),
    );
    endOfDay.setHours(23, 59, 59, 999);

    const payments = await prisma.payment.findMany({
      where: {
        datePayment: {
          gte: startOfDay, // mayor o igual que el inicio del día
          lte: endOfDay, // menor o igual que el final del día
        },
      },
      include: {
        alumno: true,
        paymentConcept: true,
      },
    });
    const opciones: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const paymentFormatExcel = payments.map((income, index) => ({
      Numero: index + 1,
      Nombre: income.alumno.fullName,
      Documento: income.alumno.dni,
      // Fecha: income.datePayment.toISOString().split("T")[0],
      Fecha: income.datePayment.toLocaleDateString("es-ES", opciones),
      Código: income.codePayment,
      ConceptoPago: income.paymentConcept.name,
      Pago: income.total,
    }));

    return NextResponse.json(paymentFormatExcel, {
      status: 200,
      headers: {
        "Cache-Control": "no-store", // Este encabezado desactiva el almacenamiento en caché
      },
    });
  } catch (error) {
    return handlePrismaError(error);
  }
}

export const dynamic = "force-dynamic";

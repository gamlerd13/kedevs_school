import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import handlePrismaError from "@/libs/responseApi/handlePrismaError";
import { IncomeFrequency, IncomeGet } from "@/models/Income";

export async function POST(req: NextRequest) {
  try {
    //Firts find the income frecuency
    const body: IncomeFrequency = await req.json();

    let payments: IncomeGet[] = [];

    if (body === IncomeFrequency.Day) {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      payments = await prisma.payment.findMany({
        where: {
          datePayment: {
            gte: startOfDay, // mayor o igual que el inicio del día
            lte: endOfDay, // menor o igual que el final del día
          },
        },
        include: {
          alumno: true,
        },
      });
    } else if (body === IncomeFrequency.Month) {
      const today = new Date();
      const month = today.getMonth();
      const year = today.getFullYear();

      const startOfDay = new Date(`${year}-${month}-1`);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      payments = await prisma.payment.findMany({
        where: {
          datePayment: {
            gte: startOfDay, // mayor o igual que el inicio del día
            lte: endOfDay, // menor o igual que el final del día
          },
        },
        include: {
          alumno: true,
        },
      });
    }

    const paymentFormatExcel = payments.map((income, index) => ({
      Numero: index + 1,
      Nombre: income.alumno.fullName,
      Documento: income.alumno.dni,
      Fecha: income.datePayment.toISOString().split("T")[0],
      Código: income.codePayment,
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

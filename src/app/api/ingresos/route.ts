import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import handlePrismaError from "@/libs/responseApi/handlePrismaError";

export async function GET(req: NextRequest) {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const payments = await prisma.payment.findMany({
      where: {
        datePayment: {
          gte: startOfDay, // mayor o igual que el inicio del día
          lte: endOfDay, // menor o igual que el final del día
        },
      },
    });

    let ingresoTotal: number = 0;
    if (payments.length > 0) {
      payments.forEach((payment) => {
        ingresoTotal += payment.total.toNumber();
      });
    }

    return NextResponse.json(ingresoTotal.toFixed(2), { status: 200 });
  } catch (error) {
    return handlePrismaError(error);
  }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import { Year } from "@prisma/client";
import handlePrismaError from "@/libs/responseApi/handlePrismaError";

export async function GET(req: NextRequest) {
  try {
    const currentYear = await prisma.year.findFirst({
      where: {
        isDefault: true,
      },
    });

    if (!currentYear) throw new Error("Current year doesn't exist");
    return NextResponse.json(currentYear, { status: 200 });
  } catch (error) {}
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body: {
      year: string;
    } = await req.json();
    const { year } = body;

    const transaction = await prisma.$transaction([
      // Desactivar cualquier año predeterminado existente
      prisma.year.updateMany({
        where: { isDefault: true },
        data: { isDefault: false },
      }),
      // Establecer el nuevo año predeterminado
      prisma.year.upsert({
        where: { year: parseInt(year) },
        update: { isDefault: true },
        create: { year: parseInt(year), isDefault: true },
      }),
    ]);

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    return handlePrismaError(error);
  }
}

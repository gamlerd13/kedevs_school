import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import handlePrismaError from "@/libs/responseApi/handlePrismaError";

interface Params {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const alumnos = await prisma.alumno.findFirst({
      where: {
        id: parseInt(params.id),
      },
    });
    if (!alumnos) throw Error("Error al obtener alumno");
    return NextResponse.json(alumnos, { status: 200 });
  } catch (error) {
    return handlePrismaError(error);
  }
}

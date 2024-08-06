import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import { Alumno, Prisma } from "@prisma/client";
import handlePrismaError from "@/libs/responseApi/handlePrismaError";

export async function GET() {
  try {
    const alumnos = await prisma.alumno.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return NextResponse.json(alumnos, { status: 200 });
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body: Alumno = await req.json();
    const { fullName, dni, grade, section } = body;

    const newAlumno = await prisma.alumno.create({
      data: {
        fullName: fullName,
        dni: dni,
        grade: grade,
        section: section,
      },
    });
    return NextResponse.json(newAlumno, { status: 201 });
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const body: Alumno = await req.json();
    const { id, ...data } = body;

    const updateAlumno = await prisma.alumno.update({
      where: {
        id: id,
      },
      data: data,
    });

    if (!updateAlumno) {
      throw new Error("No se pudo actualizar Alumno");
    }
    return NextResponse.json(updateAlumno, { status: 200 });
  } catch (error) {
    return handlePrismaError(error);
  }
}

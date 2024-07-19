import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import { Alumno } from "@prisma/client";

export async function GET() {
  try {
    const alumnos = await prisma.alumno.findMany();
    return NextResponse.json(alumnos);
  } catch (error) {
    console.error("Error fetching alumnos:", error);
    return NextResponse.error();
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body: Alumno = await req.json();
    console.log("este es el metodo post de alumno; ", body);
    const { fullName, dni, grade, section } = body;

    const newAlumno = await prisma.alumno.create({
      data: {
        fullName: fullName,
        dni: dni,
        grade: grade,
        section: section,
      },
    });
    return NextResponse.json(newAlumno, { status: 200 });
  } catch (error) {
    console.error("Error create alumno:", error);
    return NextResponse.error();
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
    const message =
      error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

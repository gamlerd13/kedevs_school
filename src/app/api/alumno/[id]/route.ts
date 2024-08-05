import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import { Alumno } from "@prisma/client";

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
    return NextResponse.json(alumnos, { status: 201 });
  } catch (error) {
    console.error("Error fetching alumno:", error);
    return NextResponse.error();
  }
}

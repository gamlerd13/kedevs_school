"use server";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";

// export async function getGrade() {
//   try {
//     const grades = await prisma.grade.findMany();
//     return NextResponse.json(grades);
//   } catch (error) {
//     console.error("Error fetching grade:", error);
//     return NextResponse.error();
//   }
// }

export async function getAlumnoById(idAlumno: number) {
  try {
    const grades = await prisma.alumno.findFirst({
      where: {
        id: idAlumno,
      },
    });
    return NextResponse.json(grades);
  } catch (error) {
    console.error("Error get Alumno :", error);
    return NextResponse.error();
  }
}

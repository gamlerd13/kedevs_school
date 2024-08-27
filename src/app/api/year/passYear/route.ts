import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import handlePrismaError from "@/libs/responseApi/handlePrismaError";
import { Grade } from "@prisma/client";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { compare } from "bcrypt-ts";

// enum Grade {
//   GARDEN_3 = "GARDEN_3",
//   GARDEN_4 = "GARDEN_4",
//   GARDEN_5 = "GARDEN_5",
//   GRADE_PRIMARY_1 = "GRADE_PRIMARY_1",
//   GRADE_PRIMARY_2 = "GRADE_PRIMARY_2",
//   GRADE_PRIMARY_3 = "GRADE_PRIMARY_3",
//   GRADE_PRIMARY_4 = "GRADE_PRIMARY_4",
//   GRADE_PRIMARY_5 = "GRADE_PRIMARY_5",
//   GRADE_PRIMARY_6 = "GRADE_PRIMARY_6",
//   GRADE_SECONDARY_1 = "GRADE_SECONDARY_1",
//   GRADE_SECONDARY_2 = "GRADE_SECONDARY_2",
//   GRADE_SECONDARY_3 = "GRADE_SECONDARY_3",
//   GRADE_SECONDARY_4 = "GRADE_SECONDARY_4",
//   GRADE_SECONDARY_5 = "GRADE_SECONDARY_5",
//   GRADE_PRE_1 = "GRADE_PRE_1",
//   GRADE_PRE_2 = "GRADE_PRE_2",
//   GRADE_PRE_3 = "GRADE_PRE_3",
//   GRADE_PRE_4 = "GRADE_PRE_4",
// }

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // Obtener el token de la sesión
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET! });

    if (!token || !token.name) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const { password } = body;

    const userDB = await prisma.user.findFirst({
      where: {
        username: token.name,
      },
    });

    if (!userDB)
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 },
      );
    console.log(userDB);
    const matchPassword = await compare(password, userDB.password);
    if (!matchPassword)
      return NextResponse.json(
        { error: "Contraseña no coinside con usuario autentificado" },
        { status: 404 },
      );
    let alumnosAmount = 0;
    // Obtener todos los alumnos y sus grados actuales
    const alumnos = await prisma.alumno.findMany({
      select: {
        id: true,
        grade: true,
      },
    });

    alumnosAmount = alumnos.length;

    let alumnosPassGradeAmount = 0;

    // Mapa de grados para la transición
    const gradeMap = Object.keys(Grade).reduce(
      (map, grade) => {
        const key = Grade[grade as keyof typeof Grade];
        const nextGrade = Object.values(Grade)[
          Object.values(Grade).indexOf(key) + 1
        ] as Grade | undefined;
        map[key] = nextGrade;
        return map;
      },
      {} as { [key in Grade]?: Grade },
    );

    // Actualizar los grados de los alumnos
    for (const alumno of alumnos) {
      const newGrade = gradeMap[alumno.grade];
      if (newGrade) {
        await prisma.alumno.update({
          where: { id: alumno.id },
          data: { grade: newGrade },
        });
        alumnosPassGradeAmount++;
      }
    }

    return NextResponse.json(
      { message: `${alumnosPassGradeAmount} de ${alumnosAmount} actualizados` },
      { status: 201 },
    );
  } catch (error) {
    return handlePrismaError(error);
  }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import { Alumno } from "@prisma/client";
import { getSession } from "next-auth/react";

export async function GET(req: NextRequest) {
  try {
    /**
     * title: Esto es algo redundante, ya que en el midleware estoy
     * permitiendo acceder a usuarios no registrados a consumir este
     * enpoint.
     *
     const publicPaths = ["/api/alumnoLastPayment"];
    const path = req.nextUrl.pathname;

    if (!publicPaths.includes(path)) {
      const session = await getSession({ req });

      if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
    }
     **/

    const alumnos = await prisma.alumno.findMany();
    // const alumnos = await prisma.alumno.findMany({
    //   include: {
    //     payments: {
    //       orderBy: {
    //         datePayment: "desc",
    //       },
    //       take: 1,
    //     },
    //   },
    // });
    return NextResponse.json(alumnos);
  } catch (error) {
    console.error("Error fetching alumnos:", error);
    return NextResponse.error();
  }
}

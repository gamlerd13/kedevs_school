import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import { PaymentPost } from "@/models/payment";
import handlePrismaError from "@/libs/responseApi/handlePrismaError";

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

    // Get alumnos with latest payment
    const alumnos = await prisma.alumno.findMany({
      include: {
        payments: {
          include: {
            paymentConcept: true,
          },
          orderBy: {
            datePayment: "desc",
          },
          take: 1,
        },
      },
    });

    return NextResponse.json(alumnos, { status: 200 });
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body: PaymentPost = await req.json();
    const { alumnoId, paymentConceptId, paymentMethod, total } = body;

    const newPayment = await prisma.payment.create({
      data: {
        alumnoId,
        paymentConceptId,
        paymentMethod,
        total,
      },
    });
    if (!newPayment) {
      throw new Error("No se pudo crear el pago");
    }
    return NextResponse.json(newPayment, { status: 201 });
  } catch (error) {
    return handlePrismaError(error);
  }
}

// export { default } from "next-auth/middleware";
import { NextFetchEvent, NextResponse, type NextRequest } from "next/server";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import prisma from "./libs/db";

const publicPaths = [
  /^\/api\/alumnoLastPayment$/,
  /^\/api\/alumno\/.*$/,
  /^\/_next\/static\/.*$/, // Recursos estáticos generados por Next.js
  /^\/favicon.ico$/, // Favicon
  /^\/logo.png$/, // Específico para `logo.png` en `public`
  /^\/.*\.(jpg|jpeg|png|gif|svg)$/, // Cualquier archivo de imagen en `public`
];

// Middleware de año
export async function yearMiddleware(request: NextRequest) {
  const url = request.nextUrl;
  const year = url.searchParams.get("year");

  let yearData;

  if (year) {
    yearData = await prisma.year.findUnique({
      where: { year: parseInt(year) },
    });
  } else {
    yearData = await prisma.year.findFirst({
      where: { isDefault: true },
    });
  }

  if (!yearData) {
    return NextResponse.json({ error: "Year not found" }, { status: 404 });
  }

  // Agregar el año a las cabeceras para su uso en los handlers
  const response = NextResponse.next();
  response.headers.set("X-Year", yearData.year.toString());
  return response;
}

const authMiddleware = withAuth({
  callbacks: {
    async authorized({ req, token }) {
      if (token) return true;

      const path = req.nextUrl.pathname;

      return publicPaths.some((publicPath) => publicPath.test(path));
    },
  },
});

// Encadenar middlewares
export async function middleware(
  request: NextRequestWithAuth,
  event: NextFetchEvent,
) {
  // Ejecutar el middleware de autenticación primero
  const authResponse = await authMiddleware(request, event);

  // Si la autenticación falla, retornar la respuesta de autenticación
  if (authResponse?.status !== 200) {
    return authResponse;
  }

  // Ejecutar el middleware de año después de la autenticación
  // return yearMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api/auth|auth/login|logo.png|_next/static|favicon.ico|public).*)", // Proteger todas las rutas excepto las rutas de autenticación, login y los recursos estáticos
  ],
};

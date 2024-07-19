// export { default } from "next-auth/middleware";

import { withAuth } from "next-auth/middleware";
export default withAuth({
  callbacks: {
    async authorized({ req, token }) {
      // Si el token existe, permite la solicitud
      if (token) return true;

      // Permitir acceso anónimo a rutas específicas
      const publicPaths = ["/api/alumnoLastPayment"];
      const path = req.nextUrl.pathname;

      return publicPaths.includes(path);
    },
  },
});

export const config = {
  // matcher: ["/home/:path*", "/cursos/:path*"], //Proteger todas las rutas despues de
  // matcher: ["/((?!auth/).*)"], //Proteger todo menos login
  // matcher: ["/((?!auth/login).*)"],
  matcher: ["/((?!api/auth|auth/login|logo.png).*)"], // Proteger todas las rutas excepto las rutas de autenticación y la de login
};

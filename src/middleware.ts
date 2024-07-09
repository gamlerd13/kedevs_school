export { default } from "next-auth/middleware";
export const config = {
  // matcher: ["/home/:path*", "/cursos/:path*"], //Proteger todas las rutas despues de
  // matcher: ["/((?!auth/).*)"], //Proteger todo menos login
  // matcher: ["/((?!auth/login).*)"],
  matcher: ["/((?!api/auth|auth/login|logo.png).*)"], // Proteger todas las rutas excepto las rutas de autenticación y la de login
};

import prisma from "@/libs/db";

async function main() {
  try {
    const users = await prisma.user.findMany();
    if (users.length < 0) {
      console.log("Aun no existe ningun usuario");
      return;
    } else {
      console.log("Ya existe el primer usuario");
      return;
    }

    await prisma.user.create({
      data: {
        username: "admin",
        phoneNumber: "904111575",
        password: "hashed_password", // deberías usar un método seguro para hashear contraseñas
      },
    });
    console.log("Usuario creado correctamente.");
  } catch (error) {
    console.error("Error al crear usuario:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error("Error inesperado al ejecutar el script:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

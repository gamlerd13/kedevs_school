import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const year = await prisma.year.upsert({
    where: { year: 2024 },
    update: {},
    create: {
      year: 2024,
      isDefault: true,
    },
  });

  console.log({ year });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

import prisma from "./db";

export const getCurrentYear = async () => {
  const yearData = await prisma.year.findFirst({
    where: { isDefault: true },
  });

  return yearData;
};

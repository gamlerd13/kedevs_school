-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PaymentMethod" ADD VALUE 'BOLETA';
ALTER TYPE "PaymentMethod" ADD VALUE 'RECIBO_INTERNO';
ALTER TYPE "PaymentMethod" ADD VALUE 'AGENTE';

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "correlativeCode" TEXT NOT NULL DEFAULT '000001';

-- AlterTable
ALTER TABLE "PaymentConcept" ALTER COLUMN "total" SET DEFAULT ARRAY[]::DECIMAL(65,30)[];

-- CreateTable
CREATE TABLE "CorrelativeCode" (
    "id" SERIAL NOT NULL,
    "nextValue" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CorrelativeCode_pkey" PRIMARY KEY ("id")
);

/*
  Warnings:

  - A unique constraint covering the columns `[alumnoId,paymentConceptId,yearId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Payment_alumnoId_paymentConceptId_key";

-- AlterTable
ALTER TABLE "PaymentConcept" ALTER COLUMN "total" SET DEFAULT ARRAY[]::DECIMAL(65,30)[];

-- CreateIndex
CREATE UNIQUE INDEX "Payment_alumnoId_paymentConceptId_yearId_key" ON "Payment"("alumnoId", "paymentConceptId", "yearId");

/*
  Warnings:

  - A unique constraint covering the columns `[codePayment]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PaymentConcept" ALTER COLUMN "total" SET DEFAULT ARRAY[]::DECIMAL(65,30)[];

-- CreateIndex
CREATE UNIQUE INDEX "Payment_codePayment_key" ON "Payment"("codePayment");

/*
  Warnings:

  - A unique constraint covering the columns `[alumnoId,paymentConceptId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Payment_alumnoId_paymentConceptId_key" ON "Payment"("alumnoId", "paymentConceptId");

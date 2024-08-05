/*
  Warnings:

  - Added the required column `paymentConceptId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "paymentConceptId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_paymentConceptId_fkey" FOREIGN KEY ("paymentConceptId") REFERENCES "PaymentConcept"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `alumnoId` on the `PaymentConcept` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PaymentConcept" DROP CONSTRAINT "PaymentConcept_alumnoId_fkey";

-- AlterTable
ALTER TABLE "PaymentConcept" DROP COLUMN "alumnoId";

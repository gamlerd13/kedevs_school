/*
  Warnings:

  - The `total` column on the `PaymentConcept` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PaymentConcept" DROP COLUMN "total",
ADD COLUMN     "total" DECIMAL(65,30)[] DEFAULT ARRAY[150, 170, 190]::DECIMAL(65,30)[];

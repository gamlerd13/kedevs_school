/*
  Warnings:

  - The values [CASH,OTHER] on the enum `PaymentMethod` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentMethod_new" AS ENUM ('YAPE', 'PLIN', 'BCP', 'BBVA', 'SCOTIABANK', 'INTERBANK', 'EFECTIVO', 'OTRO');
ALTER TABLE "Payment" ALTER COLUMN "paymentMethod" DROP DEFAULT;
ALTER TABLE "Payment" ALTER COLUMN "paymentMethod" TYPE "PaymentMethod_new" USING ("paymentMethod"::text::"PaymentMethod_new");
ALTER TYPE "PaymentMethod" RENAME TO "PaymentMethod_old";
ALTER TYPE "PaymentMethod_new" RENAME TO "PaymentMethod";
DROP TYPE "PaymentMethod_old";
ALTER TABLE "Payment" ALTER COLUMN "paymentMethod" SET DEFAULT 'YAPE';
COMMIT;

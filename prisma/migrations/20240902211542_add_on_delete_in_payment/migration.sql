-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_paymentConceptId_fkey";

-- AlterTable
ALTER TABLE "PaymentConcept" ALTER COLUMN "total" SET DEFAULT ARRAY[]::DECIMAL(65,30)[];

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_paymentConceptId_fkey" FOREIGN KEY ("paymentConceptId") REFERENCES "PaymentConcept"("id") ON DELETE CASCADE ON UPDATE CASCADE;

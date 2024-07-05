-- CreateEnum
CREATE TYPE "Grade" AS ENUM ('GARDEN_3', 'GARDEN_4', 'GARDEN_5', 'GRADE_1', 'GRADE_2', 'GRADE_3', 'GRADE_4', 'GRADE_5', 'GRADE_6');

-- CreateEnum
CREATE TYPE "Section" AS ENUM ('A', 'B', 'C', 'D', 'E');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('YAPE', 'PLIN', 'BCP', 'BBVA', 'SCOTIABANK', 'INTERBANK', 'CASH', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alumno" (
    "id" SERIAL NOT NULL,
    "dni" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "grade" "Grade" NOT NULL,
    "section" "Section" NOT NULL,

    CONSTRAINT "Alumno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentConcept" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "alumnoId" INTEGER,
    "total" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "PaymentConcept_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "alumnoId" INTEGER NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'YAPE',
    "datePayment" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "PaymentConcept" ADD CONSTRAINT "PaymentConcept_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "Alumno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "Alumno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

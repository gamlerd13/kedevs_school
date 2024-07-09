/*
  Warnings:

  - A unique constraint covering the columns `[dni]` on the table `Alumno` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Alumno" ALTER COLUMN "dni" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Alumno_dni_key" ON "Alumno"("dni");

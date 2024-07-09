/*
  Warnings:

  - The values [GRADE_1,GRADE_2,GRADE_3,GRADE_4,GRADE_5,GRADE_6] on the enum `Grade` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Grade_new" AS ENUM ('GARDEN_3', 'GARDEN_4', 'GARDEN_5', 'GRADE_PRIMARY_1', 'GRADE_PRIMARY_2', 'GRADE_PRIMARY_3', 'GRADE_PRIMARY_4', 'GRADE_PRIMARY_5', 'GRADE_PRIMARY_6', 'GRADE_SECONDARY_1', 'GRADE_SECONDARY_2', 'GRADE_SECONDARY_3', 'GRADE_SECONDARY_4', 'GRADE_SECONDARY_5', 'GRADE_PRE_1', 'GRADE_PRE_2', 'GRADE_PRE_3', 'GRADE_PRE_4');
ALTER TABLE "Alumno" ALTER COLUMN "grade" TYPE "Grade_new" USING ("grade"::text::"Grade_new");
ALTER TYPE "Grade" RENAME TO "Grade_old";
ALTER TYPE "Grade_new" RENAME TO "Grade";
DROP TYPE "Grade_old";
COMMIT;

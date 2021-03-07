/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[safeCode]` on the table `State`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[postalCode]` on the table `State`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE "State" ADD COLUMN     "safeCode" TEXT NOT NULL DEFAULT E'NULL',
ADD COLUMN     "postalCode" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "cities" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "State.safeCode_unique" ON "State"("safeCode");

-- CreateIndex
CREATE UNIQUE INDEX "State.postalCode_unique" ON "State"("postalCode");

/*
  Warnings:

  - Added the required column `capital` to the `State` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "State" ADD COLUMN     "capital" TEXT NOT NULL;

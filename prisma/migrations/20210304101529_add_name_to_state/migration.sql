/*
  Warnings:

  - Added the required column `name` to the `State` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "State" ADD COLUMN     "name" TEXT NOT NULL;

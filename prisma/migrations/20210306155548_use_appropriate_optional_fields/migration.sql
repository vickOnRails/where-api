-- DropIndex
DROP INDEX "State.postalCode_unique";

-- DropIndex
DROP INDEX "State.safeCode_unique";

-- AlterTable
ALTER TABLE "State" ALTER COLUMN "safeCode" DROP DEFAULT,
ALTER COLUMN "postalCode" DROP DEFAULT;

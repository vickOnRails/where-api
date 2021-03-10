-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LGA" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "postalCode" INTEGER,
    "description" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "safeCode" TEXT,
    "postalCode" INTEGER,
    "description" TEXT,
    "capital" TEXT NOT NULL,
    "cities" TEXT[],
    "countryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "apiKey" TEXT,
    "apiGenerationDate" TIMESTAMP(3),
    "apiDailyCount" INTEGER DEFAULT 0,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country.id_unique" ON "Country"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Country.code_unique" ON "Country"("code");

-- CreateIndex
CREATE UNIQUE INDEX "LGA.id_unique" ON "LGA"("id");

-- CreateIndex
CREATE UNIQUE INDEX "LGA.code_unique" ON "LGA"("code");

-- CreateIndex
CREATE UNIQUE INDEX "State.id_unique" ON "State"("id");

-- CreateIndex
CREATE UNIQUE INDEX "State.code_unique" ON "State"("code");

-- CreateIndex
CREATE UNIQUE INDEX "User.id_unique" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User.apiKey_unique" ON "User"("apiKey");

-- AddForeignKey
ALTER TABLE "LGA" ADD FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LGA" ADD FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "State" ADD FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

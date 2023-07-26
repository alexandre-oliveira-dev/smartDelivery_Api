/*
  Warnings:

  - The `order` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `description` to the `menuofcompanies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amoutMoney` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "menuofcompanies" DROP CONSTRAINT "menuofcompanies_companiesId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_clientsId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_companiesId_fkey";

-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "backgroundColor" TEXT,
ADD COLUMN     "pixKey" TEXT;

-- AlterTable
ALTER TABLE "menuofcompanies" ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "price" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "amoutMoney" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
DROP COLUMN "order",
ADD COLUMN     "order" JSONB[];

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name_company" TEXT,
    "companyId" TEXT,
    "backgroundColor" TEXT,
    "imgProfile" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrdersFinished" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "amountOrders" INTEGER NOT NULL,
    "amountvalue" INTEGER NOT NULL,
    "companyId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrdersFinished_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_id_key" ON "Session"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OrdersFinished_id_key" ON "OrdersFinished"("id");

-- AddForeignKey
ALTER TABLE "menuofcompanies" ADD CONSTRAINT "menuofcompanies_companiesId_fkey" FOREIGN KEY ("companiesId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_companiesId_fkey" FOREIGN KEY ("companiesId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

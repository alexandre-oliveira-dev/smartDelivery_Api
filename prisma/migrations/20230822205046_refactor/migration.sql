/*
  Warnings:

  - You are about to drop the column `closingTime` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `openingTime` on the `companies` table. All the data in the column will be lost.
  - Changed the type of `status` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "OrdersStatus" AS ENUM ('finalizado', 'entrega', 'cancelado', 'preparando');

-- AlterTable
ALTER TABLE "companies" DROP COLUMN "closingTime",
DROP COLUMN "openingTime",
ADD COLUMN     "daysOfWeeks" JSONB[];

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "status",
ADD COLUMN     "status" "OrdersStatus" NOT NULL;

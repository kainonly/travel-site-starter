/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `CustomerAddress` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `CustomerAddress` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `CustomerAddress` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `CustomerAddress` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `CustomerAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip_code` to the `CustomerAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CustomerAddress_customerId_idx";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "createdAt",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "first_name" VARCHAR NOT NULL,
ADD COLUMN     "last_name" VARCHAR NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "CustomerAddress" DROP COLUMN "createdAt",
DROP COLUMN "customerId",
DROP COLUMN "updatedAt",
DROP COLUMN "zipCode",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customer_id" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "zip_code" VARCHAR NOT NULL;

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "CustomerAddress_customer_id_idx" ON "CustomerAddress"("customer_id");

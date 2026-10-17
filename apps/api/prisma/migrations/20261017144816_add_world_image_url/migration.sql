/*
  Warnings:

  - You are about to drop the column `icon` on the `World` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "World" DROP COLUMN "icon",
ADD COLUMN     "imageUrl" TEXT;

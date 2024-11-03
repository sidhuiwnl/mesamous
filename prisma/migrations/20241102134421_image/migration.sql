/*
  Warnings:

  - Added the required column `image` to the `Messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seed` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Messages" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "seed" TEXT NOT NULL;

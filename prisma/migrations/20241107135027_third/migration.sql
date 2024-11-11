/*
  Warnings:

  - Added the required column `marca` to the `Electrodomestico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modelo` to the `Electrodomestico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Electrodomestico" ADD COLUMN     "marca" TEXT NOT NULL,
ADD COLUMN     "modelo" TEXT NOT NULL;

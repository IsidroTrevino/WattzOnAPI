/*
  Warnings:

  - You are about to alter the column `TotalPeriodo` on the `Concepto` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - You are about to alter the column `Precio` on the `Concepto` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - You are about to alter the column `LecturaActual` on the `Recibo` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - You are about to alter the column `LecturaAnterior` on the `Recibo` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - You are about to alter the column `Subtotal` on the `Recibo` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Concepto" ALTER COLUMN "TotalPeriodo" SET DATA TYPE INTEGER,
ALTER COLUMN "Precio" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Recibo" ALTER COLUMN "LecturaActual" SET DATA TYPE INTEGER,
ALTER COLUMN "LecturaAnterior" SET DATA TYPE INTEGER,
ALTER COLUMN "Subtotal" SET DATA TYPE DOUBLE PRECISION;

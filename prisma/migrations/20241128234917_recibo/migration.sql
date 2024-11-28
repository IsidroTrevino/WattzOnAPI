/*
  Warnings:

  - You are about to alter the column `Precio` on the `Concepto` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `Subtotal` on the `Recibo` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "Concepto" ALTER COLUMN "Precio" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Recibo" ALTER COLUMN "Subtotal" SET DATA TYPE DECIMAL(65,30);

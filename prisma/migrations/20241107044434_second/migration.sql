/*
  Warnings:

  - The primary key for the `Recibo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `consumo` on the `Recibo` table. All the data in the column will be lost.
  - You are about to drop the column `fechafinperiodo` on the `Recibo` table. All the data in the column will be lost.
  - You are about to drop the column `fechainicioperiodo` on the `Recibo` table. All the data in the column will be lost.
  - You are about to drop the column `monto` on the `Recibo` table. All the data in the column will be lost.
  - You are about to drop the column `reciboId` on the `Recibo` table. All the data in the column will be lost.
  - You are about to drop the column `tarifa` on the `Recibo` table. All the data in the column will be lost.
  - Added the required column `FinPeriodo` to the `Recibo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `InicioPeriodo` to the `Recibo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LecturaActual` to the `Recibo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LecturaAnterior` to the `Recibo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Subtotal` to the `Recibo` table without a default value. This is not possible if the table is not empty.
  - Made the column `usuarioId` on table `Recibo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Recibo" DROP CONSTRAINT "Recibo_pkey",
DROP COLUMN "consumo",
DROP COLUMN "fechafinperiodo",
DROP COLUMN "fechainicioperiodo",
DROP COLUMN "monto",
DROP COLUMN "reciboId",
DROP COLUMN "tarifa",
ADD COLUMN     "FinPeriodo" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "InicioPeriodo" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "LecturaActual" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "LecturaAnterior" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "Subtotal" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "idConcepto" INTEGER,
ADD COLUMN     "idRecibo" SERIAL NOT NULL,
ALTER COLUMN "usuarioId" SET NOT NULL,
ADD CONSTRAINT "Recibo_pkey" PRIMARY KEY ("idRecibo");

-- CreateTable
CREATE TABLE "Concepto" (
    "idConcepto" SERIAL NOT NULL,
    "idRecibo" INTEGER NOT NULL,
    "idCategoriaConcepto" INTEGER NOT NULL,
    "TotalPeriodo" DECIMAL(10,2) NOT NULL,
    "Precio" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Concepto_pkey" PRIMARY KEY ("idConcepto")
);

-- CreateTable
CREATE TABLE "CategoriaConcepto" (
    "idCategoriaConcepto" SERIAL NOT NULL,
    "Consumo" VARCHAR(20) NOT NULL,

    CONSTRAINT "CategoriaConcepto_pkey" PRIMARY KEY ("idCategoriaConcepto")
);

-- AddForeignKey
ALTER TABLE "Concepto" ADD CONSTRAINT "Concepto_idRecibo_fkey" FOREIGN KEY ("idRecibo") REFERENCES "Recibo"("idRecibo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Concepto" ADD CONSTRAINT "Concepto_idCategoriaConcepto_fkey" FOREIGN KEY ("idCategoriaConcepto") REFERENCES "CategoriaConcepto"("idCategoriaConcepto") ON DELETE CASCADE ON UPDATE CASCADE;

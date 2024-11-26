-- DropForeignKey
ALTER TABLE "Concepto" DROP CONSTRAINT "Concepto_idCategoriaConcepto_fkey";

-- DropForeignKey
ALTER TABLE "Concepto" DROP CONSTRAINT "Concepto_idRecibo_fkey";

-- DropForeignKey
ALTER TABLE "Recibo" DROP CONSTRAINT "Recibo_usuarioId_fkey";

-- AlterTable
ALTER TABLE "CategoriaConcepto" ALTER COLUMN "Consumo" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Recibo" ADD CONSTRAINT "Recibo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("usuarioId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Concepto" ADD CONSTRAINT "Concepto_idRecibo_fkey" FOREIGN KEY ("idRecibo") REFERENCES "Recibo"("idRecibo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Concepto" ADD CONSTRAINT "Concepto_idCategoriaConcepto_fkey" FOREIGN KEY ("idCategoriaConcepto") REFERENCES "CategoriaConcepto"("idCategoriaConcepto") ON DELETE RESTRICT ON UPDATE CASCADE;

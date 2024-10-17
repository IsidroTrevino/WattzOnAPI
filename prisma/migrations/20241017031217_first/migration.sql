-- CreateTable
CREATE TABLE "Usuario" (
    "usuarioId" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "ciudad" TEXT,
    "estado" TEXT,
    "fecharegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "apellido" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("usuarioId")
);

-- CreateTable
CREATE TABLE "Electrodomestico" (
    "electrodomesticoId" SERIAL NOT NULL,
    "usuarioId" INTEGER,
    "nombre" TEXT NOT NULL,
    "tipo" TEXT,
    "consumowatts" INTEGER,
    "descripcion" TEXT,
    "urlimagen" TEXT,
    "fecharegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Electrodomestico_pkey" PRIMARY KEY ("electrodomesticoId")
);

-- CreateTable
CREATE TABLE "Recibo" (
    "reciboId" SERIAL NOT NULL,
    "usuarioId" INTEGER,
    "fechainicioperiodo" TIMESTAMP(3) NOT NULL,
    "fechafinperiodo" TIMESTAMP(3) NOT NULL,
    "consumo" DOUBLE PRECISION,
    "monto" DOUBLE PRECISION,
    "tarifa" DOUBLE PRECISION,

    CONSTRAINT "Recibo_pkey" PRIMARY KEY ("reciboId")
);

-- CreateTable
CREATE TABLE "Tip" (
    "tipId" SERIAL NOT NULL,
    "categoria" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,

    CONSTRAINT "Tip_pkey" PRIMARY KEY ("tipId")
);

-- CreateTable
CREATE TABLE "TipsGuardados" (
    "tipguardadoId" SERIAL NOT NULL,
    "usuarioid" INTEGER NOT NULL,
    "tipid" INTEGER NOT NULL,

    CONSTRAINT "TipsGuardados_pkey" PRIMARY KEY ("tipguardadoId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Electrodomestico" ADD CONSTRAINT "Electrodomestico_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("usuarioId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recibo" ADD CONSTRAINT "Recibo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("usuarioId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TipsGuardados" ADD CONSTRAINT "TipsGuardados_usuarioid_fkey" FOREIGN KEY ("usuarioid") REFERENCES "Usuario"("usuarioId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TipsGuardados" ADD CONSTRAINT "TipsGuardados_tipid_fkey" FOREIGN KEY ("tipid") REFERENCES "Tip"("tipId") ON DELETE CASCADE ON UPDATE CASCADE;

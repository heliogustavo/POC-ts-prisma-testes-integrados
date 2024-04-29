-- CreateTable
CREATE TABLE "Bebida" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Bebida_pkey" PRIMARY KEY ("id")
);

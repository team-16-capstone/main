-- CreateTable
CREATE TABLE "Meat" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Meat_pkey" PRIMARY KEY ("id")
);

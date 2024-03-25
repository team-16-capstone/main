-- CreateTable
CREATE TABLE "Meat" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Meat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Butcher" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,

    CONSTRAINT "Butcher_pkey" PRIMARY KEY ("id")
);

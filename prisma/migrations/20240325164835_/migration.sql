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
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "phonenumber" TEXT NOT NULL,

    CONSTRAINT "Butcher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "accessible" INTEGER NOT NULL,
    "power" INTEGER NOT NULL,
    "reservable" INTEGER NOT NULL,
    "softSeating" INTEGER NOT NULL,
    "tableChairs" INTEGER NOT NULL,
    "monitor" INTEGER NOT NULL,
    "whiteboard" INTEGER NOT NULL,
    "window" INTEGER NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Block" (
    "id" SERIAL NOT NULL,
    "room_id" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "booked_user_id" INTEGER NOT NULL,
    "booked_time" TEXT NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "accountBalance" DOUBLE PRECISION NOT NULL,
    "admin" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feature" (
    "id" SERIAL NOT NULL,
    "featureName" TEXT NOT NULL,
    "enabled" INTEGER NOT NULL,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CafeOrder" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "invId" TEXT NOT NULL,
    "createdAt" BIGINT NOT NULL,
    "orderStatus" TEXT NOT NULL,
    "cafeRoyEmpId" INTEGER NOT NULL,

    CONSTRAINT "CafeOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "iced" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "sold" INTEGER NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

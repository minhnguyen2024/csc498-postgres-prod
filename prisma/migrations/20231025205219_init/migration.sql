/*
  Warnings:

  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Password` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `accountBalance` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `admin` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Password_userId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Note";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Password";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "accessible" INTEGER NOT NULL,
    "power" INTEGER NOT NULL,
    "reservable" INTEGER NOT NULL,
    "softSeating" INTEGER NOT NULL,
    "tableChairs" INTEGER NOT NULL,
    "monitor" INTEGER NOT NULL,
    "whiteboard" INTEGER NOT NULL,
    "window" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Block" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "room_id" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "booked_user_id" INTEGER NOT NULL,
    "booked_time" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Feature" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "featureName" TEXT NOT NULL,
    "enabled" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "CafeOrder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "invId" TEXT NOT NULL,
    "createdAt" BIGINT NOT NULL,
    "orderStatus" TEXT NOT NULL,
    "cafeRoyEmpId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "iced" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "sold" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "accountBalance" REAL NOT NULL,
    "admin" INTEGER NOT NULL
);
INSERT INTO "new_User" ("id") SELECT "id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

import { PrismaClient } from "@prisma/client";
import { getRandomInteger } from "~/utils/helpers";
import {
  users,
  features,
  inventory,
} from "~/utils/data";
import bcrypt from "bcryptjs";

const { v4: uuidv4 } = require("uuid");

const prisma = new PrismaClient();

function seedUser() {
  users.forEach(
    async (item) =>
      await prisma.$executeRaw`INSERT INTO User (id, username, password, accountBalance, admin) VALUES (${
        item.id
      }, ${item.username}, ${await bcrypt.hash(item.password, 10)}, 50.00, ${
        item.admin
      })`,
  );
  console.log(`User table has been seeded. 🌱`);
}

async function seedRoom() {
  for (let numRoom = 1; numRoom < 11; numRoom++) {
    await prisma.$executeRaw`
    INSERT INTO Room (accessible, power, reservable,softSeating,tableChairs,monitor,whiteboard, window) VALUES (${getRandomInteger(
      0,
      1
    )}, ${getRandomInteger(0, 1)}, ${getRandomInteger(0,1)}, ${getRandomInteger(0, 1)}, ${getRandomInteger(0,1)}, ${getRandomInteger(0, 1)}, ${getRandomInteger(
      0,
      1
    )}, ${getRandomInteger(0, 1)})`;
  }
  console.log(`Room table has been seeded. 🌱`);
}

async function seedBlock() {
  for (let numRoom = 1; numRoom < 11; numRoom++) {
    for (let numBlock = 1; numBlock < 50; numBlock++) {
      await prisma.$executeRaw`INSERT INTO Block (room_id, time, booked_user_id, booked_time) VALUES (${numRoom}, ${numBlock}, ${0}, "")`;
    }
  }
  console.log(`Block table has been seeded. 🌱`);
}


async function seedFeature() {
  for (let i = 0; i < features.length; i++) {
    await prisma.$executeRaw`INSERT INTO Feature (id, featureName, enabled) VALUES (${features[i].id}, ${features[i].featureName}, ${features[i].enabled})`;
  }
  console.log(`Feature table has been seeded. 🌱`);
}

async function seedInventory(numReps: number) {
  for (let i = 0; i < inventory.length; i++) {
    for (let j = 0; j < numReps; j++) {
      await prisma.$executeRaw`
      INSERT INTO Inventory (id, name, iced, size, image, price, sold) 
      VALUES (${uuidv4()}, ${inventory[i].name}, ${inventory[i].iced}, ${
        inventory[i].size
      }, ${inventory[i].image}, ${inventory[i].price}, 0)`;
    }
  }
  console.log(`Inventory table has been seeded. 🌱`);
}


// async function seedInventoryAndOrder() {
//   for (let i = 0; i < inventory.length; i++) {
//     await prisma.$executeRaw`INSERT INTO Inventory (id, name, iced) VALUES (${uuidv4()}, ${
//       inventory[i].name
//     }, ${inventory[i].iced})`;
//   }
//   console.log(`Inventory table has been seeded. 🌱`);
//   const result: any[] = await prisma.$queryRaw`SELECT * FROM Inventory`;
//   for (let i = 0; i < result.length; i++) {
//     await prisma.$executeRaw`INSERT INTO CafeOrder (id, userId, invId, orderStatus, cafeRoyEmpId) VALUES (${uuidv4()}, ${getRandomInteger(
//       1,
//       4,
//     )}, ${result[i].id}, "notPrepared", 0)`;
//   }
//   console.log(`CafeOrder table has been seeded. 🌱`);
// }

// async function selectExample(username: string) {
//   const result =
//     await prisma.$queryRaw`SELECT * FROM User WHERE username = ${username}`;
//   return result;
// }

// async function seedSingleUser({
//   username,
//   password,
// }: {
//   username: string;
//   password: string;
// }) {
//   await prisma.$executeRaw`INSERT INTO User (username, password) VALUES (${username}, ${password})`;
// }

seedUser();
seedBlock();
seedRoom();
seedFeature();
seedInventory(5);
// seedInventoryAndOrder()


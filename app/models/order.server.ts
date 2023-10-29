import { CafeOrder, Prisma } from "@prisma/client";
import { prisma } from "~/db.server";
import { getUserById } from "./user.server";

const { v4: uuidv4 } = require("uuid");

export type Inventory = {
  id?: string;
  name: string;
  iced: number;
  size?: string;
  image: string;
  price?: number;
  sold?: number;
};

export async function selectOrderByUserId({
  userId,
}: {
  userId: string;
}): Promise<any[]> {
  return await prisma.$queryRaw`
    SELECT CafeOrder.id AS orderId,
    User.username AS customerName,
    CafeOrder.orderStatus AS orderStatus,
    CafeOrder.cafeRoyEmpId,
    Inventory.name AS orderName,
    Inventory.price AS price,
    Inventory.size AS size,
    Inventory.iced AS iced,
    Inventory.image AS image
    FROM CafeOrder, Inventory, User
    WHERE CafeOrder.invId = Inventory.id
    AND User.id = CafeOrder.userId
    AND CafeOrder.userId = ${userId}
  `;
}

export async function selectOrders() {
  return await prisma.$queryRaw`
  SELECT CafeOrder.id AS ordId,
  CafeOrder.userId AS customerId,
  User.username AS customerName,
  CafeOrder.orderStatus AS orderStatus,
  Inventory.id AS invId,
  Inventory.name AS orderName,
  Inventory.iced AS temperature FROM CafeOrder, Inventory, User
  WHERE CafeOrder.invId = Inventory.id
  AND User.id = CafeOrder.userId`;
}
export async function selectAllInventoryByCondition({
  iced,
}: {
  iced: number;
}): Promise<Inventory[]> {
  return await prisma.$queryRaw`
  SELECT name, iced, image
  FROM Inventory 
  WHERE iced = ${iced}
  ORDER BY name ASC`;
}

export async function selectInventoryByNameCondition({
  name,
  iced,
}: {
  name: string;
  iced: number;
}): Promise<Inventory[]> {
  return await prisma.$queryRaw`
  SELECT * FROM Inventory 
  WHERE iced = ${iced}
  AND name = ${name}`;
}

export async function selectInventoryByNameConditionSize({
  name,
  iced,
  size,
}: {
  name: string;
  iced: number;
  size: string;
}): Promise<Inventory[]> {
  return await prisma.$queryRaw`
  SELECT id AS invId, price FROM Inventory
  WHERE iced = ${iced}
  AND name = ${name}
  AND size = ${size}`;
}

export async function createOrder({
  invId,
  userId,
  createdAt,
  price,
}: {
  invId: string;
  userId: number;
  createdAt: number;
  price: number;
}) {
  const orderId = uuidv4();
  await prisma.$executeRaw`
  INSERT INTO CafeOrder (id, userId, invId, createdAt, orderStatus, cafeRoyEmpId) 
  VALUES (${orderId},${userId}, ${invId}, ${createdAt}, "notPrepared", 0)`;

  // const currentUserAccountBalance:number = await getUserAccountBalanceByUserId({ userId })
  const users = await getUserById(userId);
  const user = users[0];
  const currentUserAccountBalance: number = user.accountBalance;
  const newUserAccountBalance = currentUserAccountBalance - price;

  await prisma.$executeRaw`
  UPDATE User SET accountBalance = ${newUserAccountBalance} WHERE id = ${userId}
  `;
  return orderId;
}

//One order can contains many inventory
export async function updateOrderAndInventory({
  invId,
  sold,
}: {
  invId: string;
  sold: number;
}) {
  await prisma.$executeRaw`UPDATE Inventory SET sold = ${sold} WHERE id = ${invId}`;
}

//function to update prepare status
export async function updateOrderStatus({
  orderStatus,
  orderId,
  userId,
}: {
  orderStatus: string;
  orderId: string;
  userId: number;
}) {
  return await prisma.$executeRaw`
  UPDATE CafeOrder 
  SET orderStatus=${orderStatus}, cafeRoyEmpId=${userId}
  WHERE id=${orderId}`;
}

export async function createInventory({
  iced,
  name,
  quantity,
  size,
  price,
}: {
  iced: number;
  name: string;
  quantity: number;
  size: string;
  price: number;
}) {
  for (let i = 0; i < quantity; i++) {
    await prisma.$executeRaw`
    INSERT INTO Inventory (id, name, iced, size, price) 
    VALUES (${uuidv4()}, ${name}, ${iced},${size}, ${price})`;
  }
  return null;
}

export async function selectAllInventory() {
  return await prisma.$queryRaw`SELECT * FROM Inventory`;
}

export async function selectInventoryBySearchQuery({
  invId,
  name,
  size,
  price,
  iced,
  sold,
}: {
  invId?: string;
  name?: string;
  size?: string;
  price?: number;
  iced?: number;
  sold?: number;
}): Promise<Inventory[]> {
  const invQuery: string = `%${invId}%`;
  const nameQuery: string = `%${name}%`;

  const queryResult: Inventory[] = await prisma.$queryRaw`
  SELECT * FROM Inventory 
  WHERE 1 = 1
  ${invId == "" ? Prisma.empty : Prisma.sql`AND id LIKE ${invQuery}`}
  ${name == "" ? Prisma.empty : Prisma.sql`AND name LIKE ${nameQuery}`}
  ${size == "" ? Prisma.empty : Prisma.sql`AND size = ${size}`}
  ${price == 0 ? Prisma.empty : Prisma.sql`AND price = ${price}`}
  ${iced == -1 ? Prisma.empty : Prisma.sql`AND iced = ${iced}`}
  ${sold == -1 ? Prisma.empty : Prisma.sql`AND sold = ${sold}`}
  `;
  return queryResult;
}

//Get order history by user
export async function getCafeOrderHistoryByUserId({
  userId,
  period,
}: {
  userId: number;
  period: number;
}): Promise<any[]> {
  const orderListByUserId: any[] = await prisma.$queryRaw`
    SELECT 
    CafeOrder.userId AS userId,
    CafeOrder.invId AS invId,
    CafeOrder.id AS orderId,
    Inventory.name AS name, 
    Inventory.iced AS iced,
    Inventory.size AS size,
    Inventory.price AS price
    FROM CafeOrder, Inventory, User
    WHERE CafeOrder.invId = Inventory.id
    AND User.id = CafeOrder.userId
    AND orderStatus = "finished" 
    AND CafeOrder.userId = ${userId}
    AND CafeOrder.createdAt > ${Date.now() - period}
    `;
  return orderListByUserId;
}

export async function isUserAllowedToPlaceOrder({
  userId,
}: {
  userId: number;
}): Promise<boolean> {
  const unfinishedOrders: CafeOrder[] = await prisma.$queryRaw`
  SELECT * FROM CafeOrder WHERE userId = ${userId} AND orderStatus != "finished"
  `;
  if (unfinishedOrders.length === 0) {
    return true;
  }
  return false;
}

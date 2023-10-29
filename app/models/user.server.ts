import type { User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { Prisma } from "@prisma/client";
import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: number):Promise<User[]> {
  return prisma.$queryRaw`SELECT * FROM User WHERE id = ${id}`;
}

export async function getUserByUsername(username: string) {
  return prisma.$queryRaw`SELECT * FROM User WHERE username = ${username}`;
}

export async function verifyLogin(username: string, password: string): Promise<User> {
  const existingUser: User[] =
    await prisma.$queryRaw`SELECT * FROM User WHERE username = ${username}`;
  const userWithPassword = await prisma.user.findUnique({
    where: { username },
  });

  if (!existingUser[0]) {
    return {
      id: 0,
      username: `${userWithPassword}`,
      password: "no-user-found",
      accountBalance: 0.0,
      admin: -1
    };
  }
  const isCorrectPassword: boolean = await bcrypt.compare(
    password,
    existingUser[0].password,
  );
  if (isCorrectPassword) {
    return existingUser[0];
  }
  return {
    id: 0,
    username: "",
    password: "",
    accountBalance: 0.0,
    admin: -1
  };
}

export async function getAllUsers(): Promise<User[]> {
  return await prisma.$queryRaw`SELECT * FROM User`;
}

export async function getUserAccountBalanceByUserId({ userId }: { userId: number}): Promise<object>{
  return await prisma.$queryRaw`
  SELECT accountBalance FROM User WHERE id = ${userId}
  `
}

export async function selectUsersBySearchQuery({
  userId,
  username,
  permission,
}: {
  userId?: number;
  username?: string;
  permission?: number;
}): Promise<User[]> {
  const usernameQuery: string = `%${username}%`;
  return await prisma.$queryRaw`
  SELECT * FROM User 
  WHERE 1 = 1
  ${userId == 0 ? Prisma.empty : Prisma.sql`AND id = ${userId}`}
  ${
    usernameQuery == ""
      ? Prisma.empty
      : Prisma.sql`AND username LIKE ${usernameQuery}`
  }
  ${permission == -1 ? Prisma.empty : Prisma.sql`AND admin = ${permission}`}
  `;
}

export async function createUser({
  username,
  password,
  permission,
}: {
  username: string;
  password: string;
  permission: number;
}): Promise<number> {
  const hashedPassword: string = await bcrypt.hash(password, 10);
  await prisma.$executeRaw`
  INSERT INTO User(username, password, admin) 
  VALUES (${username}, ${hashedPassword}, ${permission})`;
  const users: User[] = await prisma.$queryRaw`SELECT * FROM User WHERE username = ${username}`
  const user: User = users[0]
  return user.id
}

export async function deleteUser({ id }: { id: number }) {
  return await prisma.$executeRaw`DELETE FROM User WHERE id = ${id}`;
}

export async function addFundToUserByUserId({ userId, amount}: { userId: number, amount: number}) {
  const currentBalance: any = await getUserAccountBalanceByUserId({ userId })
  console.log({ currentBalance, amount})
  return prisma.$executeRaw`UPDATE User SET accountBalance = ${currentBalance[0].accountBalance + amount} WHERE id = ${userId}`
}
import { Prisma } from "@prisma/client";
import { prisma } from "~/db.server";

export type Block = {
  id: number
  room_id: number
  time: number
  booked_user_id: number
  booked_time: string
}

export async function getAllBlocks(): Promise<Block[]> {
  return await prisma.$queryRaw`SELECT * FROM Block ORDER BY time ASC`;
}

export async function getAllAvailableBlocks() {
  return await prisma.$queryRaw`SELECT User.username, Room.id, Block.id FROM Block, Room , User 
                WHERE Block.room_id = Room.id 
                AND Block.booked_user_id = 0`;
}

export async function getAllUnavailableBlocks() {
  return await prisma.$queryRaw`SELECT User.username, Room.id, Block.id FROM Block, Room , User 
                WHERE Block.room_id = Room.id 
                AND Block.booked_user_id != 0`;
}

export async function getAllAvailableRoomsByBlockAndAmenities({
  userId,
  time,
  accessible,
  power,
  reservable,
  softSeating,
  tableChairs,
  monitor,
  whiteboard,
  window,
}: {
  userId: string;
  time: string,
  accessible: string;
  power: string;
  reservable: string;
  softSeating: string;
  tableChairs: string;
  monitor: string;
  whiteboard: string;
  window: string;
}) {
    const queryResult = await prisma.$queryRaw`SELECT 
        Room.id as roomId,
        Block.id AS blockId, 
        Block.time AS time,
        Block.booked_user_id, 
        Room.accessible, 
        Room.power, 
        Room.reservable, 
        Room.softSeating,  
        Room.tableChairs, 
        Room.monitor, 
        Room.whiteboard, 
        Room.window 
        FROM Room, Block 
        WHERE Block.room_id = Room.id 
        ${accessible === 'on' ? Prisma.sql`AND Room.accessible = 1` : Prisma.empty }
        ${power === 'on' ? Prisma.sql`AND Room.power = 1` : Prisma.empty }
        ${reservable === 'on' ? Prisma.sql`AND Room.reservable = 1` : Prisma.empty }
        ${softSeating === 'on' ? Prisma.sql`AND Room.softSeating = 1` : Prisma.empty }
        ${tableChairs === 'on' ? Prisma.sql`AND Room.tableChairs = 1` : Prisma.empty }
        ${monitor === 'on' ? Prisma.sql`AND Room.monitor = 1` : Prisma.empty }
        ${whiteboard === 'on' ? Prisma.sql`AND Room.whiteboard = 1` : Prisma.empty }
        ${window === 'on' ? Prisma.sql`AND Room.window = 1` : Prisma.empty }
        AND Block.time = ${time}
        AND Block.booked_user_id = 0`
       
    return queryResult
}

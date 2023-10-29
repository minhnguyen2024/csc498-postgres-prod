import { prisma } from "~/db.server";

export type BookingInfo = {
  blockId: number;
  bookedTime: string
  roomId: number;
  accessible: number;
  power: number;
  reservable: number;
  softSeating: number;
  tableChairs: number;
  monitor: number;
  whiteboard: number;
  window: number;

};

export async function getBlockByTimeAndRoomId({
  time,
  roomId,
}: {
  time: string;
  roomId: string;
}) {
  return await prisma.$queryRaw`SELECT * FROM Block, Room
                  WHERE Block.room_id = Room.id 
                  AND Block.time = ${time}
                  AND Room.id = ${roomId}
                  AND Block.booked_user_id != 0`;
}

//can also be used to delete reservation by setting userId = 0
export async function updateBlockWithUserId({
  userId,
  room,
  timeObjJSONString
}: {
  userId: string;
  room: any;
  timeObjJSONString: string
}) {
  // console.log({
  //   userId,
  //   room,
  //   timeObjJSONString
  // })
  if (typeof room === "string") {
    console.log(JSON.parse(timeObjJSONString))
    const roomObj = JSON.parse(room);
    return await prisma.$executeRaw`UPDATE Block SET booked_user_id = ${userId}, booked_time = ${timeObjJSONString} WHERE id = ${roomObj.blockId} `;
  } else {
    return await prisma.$executeRaw`UPDATE Block SET booked_user_id = ${userId}, booked_time = ${timeObjJSONString} WHERE id = ${room.blockId}`;
  }
}

export async function confirmRoomBookingWithUserId(
  userId: string,
): Promise<BookingInfo[]> {
  return await prisma.$queryRaw`SELECT Block.id AS blockId, Block.booked_time AS bookedTime, Room.id AS roomId, Block.time AS time, Room.accessible, Room.power, Room.reservable, Room.softSeating, Room.tableChairs, Room.monitor, Room.whiteboard, Room.window FROM Room, Block 
            WHERE Block.room_id = Room.id 
            AND Block.booked_user_id = ${userId}`;
}

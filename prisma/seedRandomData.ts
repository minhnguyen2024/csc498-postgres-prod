import { Inventory, PrismaClient, User } from "@prisma/client";
import {
  createOrder,
  updateOrderAndInventory,
  updateOrderStatus,
} from "~/models/order.server";
import { getRandomInteger } from "~/utils/helpers";

const prisma = new PrismaClient();
async function seedExampleOrder() {
  //these are 40 inventory items randomly selected
  const selectedInventory: Inventory[] = await prisma.$queryRaw`
    SELECT *
    FROM Inventory
    ORDER BY RANDOM()
    LIMIT 40;
    `;
  //assign these items to users
  const studentUsers: User[] =
    await prisma.$queryRaw`SELECT * FROM User WHERE admin = 0`;

  for (let i = 0; i < selectedInventory.length; i++) {
    const randUserIndex = getRandomInteger(0, studentUsers.length - 1);
    const userId: number = studentUsers[randUserIndex].id;
    const invId: string = selectedInventory[i].id;
    const price: number = Number(selectedInventory[i].price);

    const orderId: string = await createOrder({
      invId,
      userId,
      createdAt: Date.now(),
      price,
    });

    await updateOrderStatus({
      orderStatus: "finished",
      orderId,
      userId,
    });
    await updateOrderAndInventory({ invId, sold: 1 });
  }
  console.log(`seedExampleOrder has been executed. 🌱`);
}
seedExampleOrder();

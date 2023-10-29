import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { redirect, type ActionArgs, type LoaderArgs } from "@remix-run/node";
import { Form, Outlet, useLoaderData } from "@remix-run/react";
import { updateOrderAndInventory, selectOrders, updateOrderStatus } from "~/models/order.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  //userId will be a admin = 2 id
  await requireUserId(request)
  //SQL model to fetch all orders and their status
  const orders: any = await selectOrders();
  return { orders };
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const userId: number = await requireUserId(request) as number;
  //SQL models to handle
  let orderStatus: string = body.get("orderStatus") as string;
  const orderId: string = body.get("orderId") as string;

  if (orderStatus === "preparing") {
    await updateOrderStatus({ orderStatus, orderId, userId });
  } else if (orderStatus === "ready") {
    await updateOrderStatus({ orderStatus, orderId, userId });
  } else {
    const invId = body.get("invId") as string
    await updateOrderStatus({ orderStatus, orderId, userId });
    await updateOrderAndInventory({ invId, sold: 1 })
  }
  return redirect("");
};

export default function DashboardReserveUserId() {
  const { orders } = useLoaderData<typeof loader>();
  return (
    <div className="">
      <div>
        <Table>
          <TableCaption>Orders</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Temperature</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((item: any) => {
              if (item.orderStatus !== "finished") {
                return (
                  <TableRow className="border rounded" key={item.ordId}>
                    <TableCell>{item.ordId}</TableCell>
                    <TableCell>{item.orderName}</TableCell>
                    <TableCell>
                      {item.temperature === 1 ? "Iced" : "Hot"}
                    </TableCell>
                    <TableCell>{item.customerName}</TableCell>
                    <TableCell>{item.orderStatus}</TableCell>
                    {item.orderStatus === "notPrepared" ? (
                      <TableCell>
                        <Form method="post">
                          <input
                            type="hidden"
                            name="orderStatus"
                            value="preparing"
                          />
                          <input
                            type="hidden"
                            name="orderId"
                            value={item.ordId}
                          />
                          <Button className="border rounded bg-red-500 hover:bg-red-200 text-white">
                            Prepare
                          </Button>
                        </Form>
                      </TableCell>
                    ) : item.orderStatus === "preparing" ? (
                      <TableCell>
                        <Form method="post">
                          <input
                            type="hidden"
                            name="orderStatus"
                            value="ready"
                          />
                          <input
                            type="hidden"
                            name="orderId"
                            value={item.ordId}
                          />
                          <Button className="border rounded bg-yellow-500 hover:bg-yellow-200 text-white">
                            Preparing
                          </Button>
                        </Form>
                      </TableCell>
                    ) : item.orderStatus === "ready" ? (
                      <TableCell>
                        <Form method="post">
                          <input
                            type="hidden"
                            name="orderStatus"
                            value="finished"
                          />
                          <input
                            type="hidden"
                            name="orderId"
                            value={item.ordId}
                          />
                          <input
                            type="hidden"
                            name="invId"
                            value={item.invId}
                          />
                          <Button className="border rounded bg-green-500 hover:bg-green-200 text-white">
                            Ready for pick-up
                          </Button>
                        </Form>
                      </TableCell>
                    ) : item.orderStatus === "finished" ? (
                      <></>
                    ) : (
                      <></>
                    )}
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </div>

      <Outlet />
    </div>
  );
}

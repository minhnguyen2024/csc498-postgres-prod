import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { User } from "@prisma/client";
import { type LoaderArgs } from "@remix-run/node";
import { Form, Outlet, useLoaderData } from "@remix-run/react";
import { MyDoughnutChart } from "~/components/MyDoughnutChart";
import { getCafeOrderHistoryByUserId } from "~/models/order.server";
import { getUserById } from "~/models/user.server";

import { requireUserId } from "~/session.server";
import {
  DAY_IN_MILISECONDS,
  MONTH_IN_MILISECONDS,
  WEEK_IN_MILISECONDS,
} from "~/utils/data";
import { getRandomInteger } from "~/utils/helpers";
import { positiveButtonCSS } from "~/utils/tailwind.helpers";

export async function loader({ request }: LoaderArgs) {
  const userId: number = parseInt((await requireUserId(request)).toString());
  const users: User[] = await getUserById(userId);
  const user = users[0];

  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);

  let period: number = parseInt(search.get("period") as string);
  
  switch (period) {
    case 30:
      period = MONTH_IN_MILISECONDS;
      break;
    case 7:
      period = WEEK_IN_MILISECONDS;
      break;
    case 1:
      period = DAY_IN_MILISECONDS;
      break;
    default:
      period = Date.now();
      break;
  }
  console.log(`period: ${period}`)
  const orders: any[] = await getCafeOrderHistoryByUserId({
    userId,
    period,
  });

  // console.log(serializedOrdersArr);
  return { orders, user };
}

export default function CafeRoy() {
  const { orders, user } = useLoaderData<typeof loader>();
  const labels: any[] = [];
  orders.forEach((order) => labels.push(order.name));
  let priceArr: any[] = [];
  orders.map((order) => priceArr.push(order.price));
  let total: number = priceArr.reduce(
    (acc, cur) => parseFloat(cur) + parseFloat(acc),
    0,
  );
  const values: any[] = [];

  labels.forEach((label) => {
    let labelCt = 0;
    orders.forEach((order) => {
      if (order.name === label) {
        labelCt += 1;
      }
    });
    values.push(labelCt);
  });

  const getColorArr = (opacity: number): string[] => {
    let colorArr = [];
    for (let i = 0; i < values.length; i++) {
      colorArr.push(
        `rgba(${getRandomInteger(1, 254)}, ${getRandomInteger(
          1,
          254,
        )}, ${getRandomInteger(1, 254)}, ${opacity})`,
      );
    }
    return colorArr;
  };

  const data = {
    labels,
    datasets: [
      {
        label: "# of Orders",
        data: values,
        backgroundColor: getColorArr(0.2),
        borderColor: getColorArr(1),
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <div className="flex py-4">
        {orders.length != 0 ? (
          <div className={`h-[400px] w-[400px]`}>
            <MyDoughnutChart data={data} />
          </div>
        ) : (
          <div className={`h-[400px] w-[400px]`}>
            <p>No Order History Found</p>
          </div>
        )}
        <div>
          <Form>
            <div className="p-2 flex mx-2">
              <Select name="period">
                <SelectTrigger className="w-[100px] border-2 border-black rounded px-2">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent className="w-[100px] bg-slate-100">
                  <SelectGroup>
                    <div className="hover:bg-slate-300 p-2">
                      <SelectItem value="0">All</SelectItem>
                    </div>
                    <div className="hover:bg-slate-300 p-2">
                      <SelectItem value="30">Last 30 days</SelectItem>
                    </div>
                    <div className="hover:bg-slate-300 p-2">
                      <SelectItem value="7">Last 7 Days</SelectItem>
                    </div>
                    <div className="hover:bg-slate-300 p-2">
                      <SelectItem value="1">Today</SelectItem>
                    </div>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button className={`${positiveButtonCSS()}`}>Search</Button>
            </div>
          </Form>
          <div>
            <p>Username: {user.username}</p>
            <p>Current Balance: ${user.accountBalance}</p>
            <p>Total spent: ${total.toFixed(2)}</p>
          </div>
        </div>

        <Outlet />
      </div>
      <div>
        <Table>
          <TableCaption>Orders</TableCaption>
          <TableHeader className="items-start justify-start bg-slate-300">
            <TableRow>
              <TableHead className="text-left">Order #</TableHead>
              <TableHead className="text-left">Item</TableHead>
              <TableHead className="text-left">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((item: any) => {
              return (
                <>
                  <TableRow
                    className="border-b hover:bg-slate-400"
                    key={item.orderId}
                  >
                    <TableCell className="p-3">{item.orderId}</TableCell>
                    <TableCell className="p-3">{`${item.name} (${
                      item.iced == 1 ? "Iced" : "Hot"
                    }, ${item.size})`}</TableCell>
                    <TableCell className="p-3">${item.price}</TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
          <TableRow className="border rounded" key={total}>
            <TableCell>Total:</TableCell>
            <TableCell></TableCell>
            <TableCell>${total.toFixed(2)}</TableCell>
          </TableRow>
        </Table>
      </div>
    </div>
  );
}

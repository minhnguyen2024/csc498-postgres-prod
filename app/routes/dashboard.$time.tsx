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
import {
  redirect,
  type ActionArgs,
  type LoaderArgs,
  json,
} from "@remix-run/node";
import { Outlet, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import invariant from "tiny-invariant";
import {
  confirmRoomBookingWithUserId,
  updateBlockWithUserId,
} from "~/models/confirm.server";
import { getAllAvailableRoomsByBlockAndAmenities } from "~/models/reserve.server";
import { requireUserId } from "~/session.server";

// function getAvailableRoomsByBlock(arr: any) {
//   const result = [];
//   for (let i = 0; i < arr.length; i++) {
//     result.push(arr[i].id);
//   }
//   return result;
// }

export const loader = async ({ params, request }: LoaderArgs) => {
  const userId = (await requireUserId(request)).toString();
  invariant(params.time, "time not found");
  const timeObj = JSON.parse(decodeURIComponent(params.time));
  const time = timeObj.time
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  let accessible = search.get("accessible");
  if (!accessible) {
    accessible = "off";
  }
  let power = search.get("power");
  if (!power) {
    power = "off";
  }
  let reservable = search.get("reservable");
  if (!reservable) {
    reservable = "off";
  }
  let softSeating = search.get("soft-seating");
  if (!softSeating) {
    softSeating = "off";
  }
  let tableChairs = search.get("table-chairs");
  if (!tableChairs) {
    tableChairs = "off";
  }
  let monitor = search.get("monitor");
  if (!monitor) {
    monitor = "off";
  }
  let whiteboard = search.get("whiteboard");
  if (!whiteboard) {
    whiteboard = "off";
  }
  let window = search.get("window");
  if (!window) {
    window = "off";
  }
  const queryObject = {
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
  };
  const result = await getAllAvailableRoomsByBlockAndAmenities(queryObject);
  const serializedArray = encodeURIComponent(JSON.stringify(result));
  return { timeObj, serializedArray };
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const userId = (await requireUserId(request)).toString();
  const timeObj = JSON.parse(body.get("time")?.toString() || "")
  const room = body.get("room");
  const timeObjJSONString = JSON.stringify(body.get("time"))
  if (!room) {
    return json(
      { errors: { message: "Please select a room" } },
      { status: 400 },
    );
  }
  const userReservation: object[] = await confirmRoomBookingWithUserId(userId);
  let isUserReserved = userReservation.length === 1 ? true : false;
  if (isUserReserved) {
    return redirect("/error/reservationDenied");
  }

  await updateBlockWithUserId({ userId, room, timeObjJSONString});
  return redirect(`/confirm/${timeObj.time}/${room}`);
};

export default function DashboardReserveUserId() {
  const { timeObj, serializedArray } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const confirmRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.message) {
      confirmRef.current?.focus();
    }
  }, [actionData]);

  const deserializedRooms = JSON.parse(decodeURIComponent(serializedArray));
  return (
    <div>
      <form method="get">
        <div className="items-center justify-center">
          <div className="grid grid-cols-2">
            <div className="p-3">
              <div className="items-top flex space-x-2 my-2">
                <input type="checkbox" name="accessible" id="accessible" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accessible Seat/Space
                  </label>
                </div>
              </div>
              <div className="items-top flex space-x-2 my-2">
                <input type="checkbox" name="power" id="power" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Power Available
                  </label>
                </div>
              </div>
              <div className="items-top flex space-x-2 my-2">
                <input type="checkbox" name="reservable" id="reservable" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Reservable
                  </label>
                </div>
              </div>
              <div className="items-top flex space-x-2 my-2">
                <input type="checkbox" name="soft-seating" id="soft-seating" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Soft Seating Only
                  </label>
                </div>
              </div>
            </div>
            <div className="p-3">
              <div className="items-top flex space-x-2 my-2">
                <input type="checkbox" name="table-chairs" id="table-chairs" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Table and Chairs
                  </label>
                </div>
              </div>
              <div className="items-top flex space-x-2 my-2">
                <input type="checkbox" name="monitor" id="monitor" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Wall-mounted Monitor
                  </label>
                </div>
              </div>
              <div className="items-top flex space-x-2 my-2">
                <input type="checkbox" name="whiteboard" id="whiteboard" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Whiteboard
                  </label>
                </div>
              </div>
              <div className="items-top flex space-x-2 my-2">
                <input type="checkbox" name="window" id="window" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Window
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          className="border rounded hover:bg-blue-300 bg-blue-500 text-white"
        >
          Filter
        </Button>
      </form>
      <div>
        <form method="post">
          <input type="hidden" value={JSON.stringify(timeObj)} name="time" />

          <Table>
            <TableCaption>Available Study Rooms for {timeObj.dayOfWeek}, from {timeObj.timeOfDay} to {timeObj.timeOfDay + 2}</TableCaption>
            <TableHeader className="items-start justify-start bg-slate-300">
              <TableRow>
                <TableHead className="">Room #</TableHead>
                <TableHead>Amenities</TableHead>
                <TableHead>Select</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            
              {deserializedRooms.map((item: any) => (
                <TableRow
                className="border-b hover:bg-slate-400"
                  key={item.roomId}
                >
                  <TableCell className="p-3">{item.roomId}</TableCell>
                  <TableCell className="p-3">
                    {item.accessible == 1 ? "Accessible, " : " "}
                    {item.power == 1 ? "Power, " : " "}
                    {item.reservable == 1 ? "Reservable, " : " "}
                    {item.softSeating == 1 ? "Soft-seating, " : " "}
                    {item.tableChairs == 1 ? "Table and Chairs, " : " "}
                    {item.monitor == 1 ? "Monitor, " : " "}
                    {item.whiteboard == 1 ? "Whiteboard, " : " "}
                    {item.window == 1 ? "Window, " : " "}
                  </TableCell>
                  <TableCell className="p-3">
                    <input
                      type="radio"
                      value={JSON.stringify(item)}
                      name="room"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div ref={confirmRef}>
            <Button className="border rounded hover:bg-green-300 bg-green-500 text-white">
              Confirm
            </Button>
          </div>
          {actionData?.errors?.message ? (
            <div className="pt-1 text-red-700" id="password-error">
              {actionData.errors.message}
            </div>
          ) : null}
        </form>
      </div>
      <Outlet />
    </div>
  );
}

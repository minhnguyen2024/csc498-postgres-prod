import { redirect, type ActionArgs, type LoaderArgs } from "@remix-run/node";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLoaderData } from "@remix-run/react";
import { Room, selectRoomById, updateRoom } from "~/models/room.server";
import { Button } from "@/components/ui/button";


export const loader = async ({ params, request }: LoaderArgs) => {
  const roomId = parseInt(params.roomId as string);
  const room: Room[] = await selectRoomById({ roomId });
  return { room: room[0] };
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const id: number = parseInt(body.get("roomId") as string);
  const accessible: number = body.get("accessible") === "on" ? 1 : 0;
  const power: number = body.get("power") === "on" ? 1 : 0;
  const reservable: number = body.get("reservable") === "on" ? 1 : 0;
  const softSeating: number = body.get("softSeating") === "on" ? 1 : 0;
  const tableChairs: number = body.get("tableChairs") === "on" ? 1 : 0;
  const monitor: number = body.get("monitor") === "on" ? 1 : 0;
  const whiteboard: number = body.get("whiteboard") === "on" ? 1 : 0;
  const window: number = body.get("window") === "on" ? 1 : 0;
  await updateRoom({
    id,
    accessible,
    power,
    reservable,
    softSeating,
    tableChairs,
    monitor,
    whiteboard,
    window,
  });
  return redirect(`/dashboard/admin/manageStudyRooms/view`)
};

export default function UpdateRoom() {
    const { room } = useLoaderData<typeof loader>();
  return (
    <div>
      <Table>
        <TableCaption>A list of available Study Rooms</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Room #</TableHead>
            <TableHead>Amenities</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="border rounded" key={room.id}>
            <TableCell>{room.id}</TableCell>
            <TableCell>
              {room.accessible == 1 ? "Accessible, " : " "}
              {room.power == 1 ? "Power, " : " "}
              {room.reservable == 1 ? "Reservable, " : " "}
              {room.softSeating == 1 ? "Soft-seating, " : " "}
              {room.tableChairs == 1 ? "Table and Chairs, " : " "}
              {room.monitor == 1 ? "Monitor, " : " "}
              {room.whiteboard == 1 ? "Whiteboard, " : " "}
              {room.window == 1 ? "Window, " : " "}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <form method="post">
        <input type="hidden" value={room.id} name="roomId" />
        <div className="items-top flex-box">
          <div className="items-top flex space-x-2">
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
          <div className="items-top flex space-x-2">
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
          <div className="items-top flex space-x-2">
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
          <div className="items-top flex space-x-2">
            <input type="checkbox" name="softSeating" id="softSeating" />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Soft Seating Only
              </label>
            </div>
          </div>
          <div className="items-top flex space-x-2">
            <input type="checkbox" name="tableChairs" id="tableChairs" />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Table and Chairs
              </label>
            </div>
          </div>
          <div className="items-top flex space-x-2">
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
          <div className="items-top flex space-x-2">
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
          <div className="items-top flex space-x-2">
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
        <Button type="submit" name="action" value="_update">
          Update Room
        </Button>
      </form>
    </div>
  );
}

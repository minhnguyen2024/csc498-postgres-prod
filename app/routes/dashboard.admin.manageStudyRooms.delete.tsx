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
import { type LoaderArgs, type ActionArgs, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { Room, deleteRoombyId, selectAllRooms } from "~/models/room.server";

export const loader = async ({ request }: LoaderArgs) => {
  const rooms: Room[] = await selectAllRooms();
  return { rooms };
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  invariant(body.get("roomId"), "")
  const roomId = parseInt(body.get("roomId") as string)
  await deleteRoombyId({ roomId })
  return redirect("/dashboard/admin/manageStudyRooms/delete")
};

//testing SQL delete model, will change to table with delete button, pop a modal
export default function DeleteRoom() {
  const { rooms } = useLoaderData<typeof loader>();

  return (
    <div>
      <Form method="post">
        <input className="border" type="text" name="roomId" />
        <label>Room ID:</label>
      </Form>

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
            {rooms.map((item: any) => (
              <TableRow className="border rounded" key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>
                  {item.accessible == 1 ? "Accessible, " : " "}
                  {item.power == 1 ? "Power, " : " "}
                  {item.reservable == 1 ? "Reservable, " : " "}
                  {item.softSeating == 1 ? "Soft-seating, " : " "}
                  {item.tableChairs == 1 ? "Table and Chairs, " : " "}
                  {item.monitor == 1 ? "Monitor, " : " "}
                  {item.whiteboard == 1 ? "Whiteboard, " : " "}
                  {item.window == 1 ? "Window, " : " "}
                </TableCell>
                <TableCell>
                  <form method="post">
                    <input type="hidden" value={item.id} name="roomId" />
                    <Button className="border rounded bg-green-500 text-white">
                      Delete
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type LoaderArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { confirmRoomBookingWithUserId } from "~/models/confirm.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  invariant(params.time, "time not found");
  invariant(params.room, "room not found");
  await confirmRoomBookingWithUserId(userId.toString());
  const room = JSON.parse(decodeURIComponent(params.room));
  return json(room);
};

export default function ConfirmReservation() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center flex-col">
        <div>
          <Card className="w-[380px] border rounded">
            <CardHeader>
              <CardTitle>Your Reservation Has Been Confirmed!</CardTitle>
              <CardDescription>See below for details</CardDescription>
            </CardHeader>
            <CardContent className="p-3">
              <p>Room Number: {data.roomId}</p>
              {data.accessible === 1 ? <p>✅ Accessible</p> : <></>}
              {data.power === 1 ? <p>✅ Power </p> : <></>}
              {data.reservable === 1 ? <p>✅ Reservable</p> : <></>}
              {data.softSeating === 1 ? <p>✅ Soft Seating</p> : <></>}
              {data.tableChairs === 1 ? <p>✅ Table and Chairs</p> : <></>}
              {data.monitor === 1 ? <p>✅ Monitor</p> : <></>}
              {data.whiteboard === 1 ? <p>✅ Whiteboard</p> : <></>}
              {data.window === 1 ? <p>✅ Window</p> : <></>}
            </CardContent>
          </Card>
        </div>
        <div>
          <Link
            className="my-2 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"
            to="/dashboard/reservationStatus"
          >
            Check Reservation Status
          </Link>
        </div>
      </div>
    </div>
  );
}

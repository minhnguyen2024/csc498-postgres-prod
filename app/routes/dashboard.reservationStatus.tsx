import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ActionArgs,
  type LoaderArgs,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import {
  confirmRoomBookingWithUserId,
  updateBlockWithUserId,
} from "~/models/confirm.server";
import { requireUserId } from "~/session.server";
import { getFeatureByName, type Feature } from "~/models/manage.server";
import { type BookingInfo } from "~/models/confirm.server";
import FeatureDisabled from "./error.featureDisabled";
import { militaryTo12Hour } from "~/utils/helpers";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const featureFlag: Feature[] = await getFeatureByName("reserveStudyRoom");
  const userReservation: BookingInfo[] = await confirmRoomBookingWithUserId(
    userId.toString(),
  );
  let data: BookingInfo = userReservation[0];

  if (userReservation.length > 0) {
    return { data, featureFlag: featureFlag[0] };
  }
  return { data, featureFlag: featureFlag[0] };
}

export async function action({ request }: ActionArgs) {
  const userId = (await requireUserId(request)).toString();
  const body = await request.formData();
  let blockId = body.get("blockId");
  invariant(blockId, "blockId not found");
  const roomObj: any = { blockId: blockId.toString() };
  await updateBlockWithUserId({
    userId: "0",
    room: roomObj,
    timeObjJSONString: ""
  });
  const userReservation: object[] = await confirmRoomBookingWithUserId(userId);
  let isUserCancelled = userReservation.length === 0 ? true : false;
  if (isUserCancelled) {
    return redirect("/dashboard/reserve");
  }
  return null;
}

export default function ReservationStatus() {
  const { data, featureFlag } = useLoaderData<typeof loader>();
  let bookedTimeString = ""
  if(data != null){
    const bookedTime = JSON.parse(JSON.parse(data.bookedTime))
    bookedTimeString = `${bookedTime["dayOfWeek"]} from ${militaryTo12Hour(bookedTime["timeOfDay"])} to ${militaryTo12Hour(bookedTime["timeOfDay"] + 2)}`
  }
  return (
    <div>
      {featureFlag.enabled === 1 ? (
        <div className="flex-row items-center justify-center h-screen">
          {data ? (
            <div className="container mx-auto flex items-center justify-center">
              <Card className="w-[380px] border rounded p-3">
                <CardHeader>
                  <CardTitle>Your Reservation Has Been Confirmed!</CardTitle>
                  <CardDescription>See below for details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex-box items-center justify-center">
                    <p>Room Number: {data.roomId}</p>
                    <p>Time: {bookedTimeString}</p>
                    {data.accessible === 1 ? <p>✅ Accessible</p> : <></>}
                    {data.power === 1 ? <p>✅ Power </p> : <></>}
                    {data.reservable === 1 ? <p>✅ Reservable</p> : <></>}
                    {data.softSeating === 1 ? <p>✅ Soft Seating</p> : <></>}
                    {data.tableChairs === 1 ? (
                      <p>✅ Table and Chairs</p>
                    ) : (
                      <></>
                    )}
                    {data.monitor === 1 ? <p>✅ Monitor</p> : <></>}
                    {data.whiteboard === 1 ? <p>✅ Whiteboard</p> : <></>}
                    {data.window === 1 ? <p>✅ Window</p> : <></>}
                  </div>
                </CardContent>
                <CardFooter>
                  <Form method="post">
                    <input type="hidden" value={data.blockId} name="blockId" />
                    <Button className="border rounded bg-red-500 text-white">
                      Cancel Reservation
                    </Button>
                  </Form>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <p>No Study Rooms Reserved</p>
          )}
        </div>
      ) : (
        <FeatureDisabled featureName="Reservation Status" />
      )}
    </div>
  );
}

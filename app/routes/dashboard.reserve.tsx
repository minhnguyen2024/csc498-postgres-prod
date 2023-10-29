import { Card, CardContent } from "@/components/ui/card";
import { type LoaderArgs, type ActionArgs, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getFeatureByName, type Feature } from "~/models/manage.server";
import { Block, getAllBlocks } from "~/models/reserve.server";
import { requireUserId } from "~/session.server";
import { Button } from "@/components/ui/button";
import FeatureDisabled from "./error.featureDisabled";
import { getNumberOfRooms } from "~/models/room.server";
import { partitionArrayByChunk } from "~/utils/helpers";
import { TIME_ARR, DATE_IN_WEEK } from "~/utils/data";

export async function loader({ request }: LoaderArgs) {
  await requireUserId(request);
  //return array of all blocks (490) orded by Block.time
  //Example: 10 entries of time 1, 10 entries of time 2,...
  const blocks: Block[] = await getAllBlocks();
  const result: any[] = await getNumberOfRooms();
  const numRooms: number = Number(result[0]["COUNT(*)"]);

  //return array of length = 49 (partitioned by 490 / 10 = 49)
  //each element is an array of 10 time blocks
  const partitionedBy10 = partitionArrayByChunk(blocks, numRooms);
  const partitionedBy10By7 = partitionArrayByChunk(partitionedBy10, 7);
  const featureFlag: Feature[] = await getFeatureByName("reserveStudyRoom");
  return { partitionedBy10By7, featureFlag: featureFlag[0] };
}

export async function action({ request }: ActionArgs) {
  await requireUserId(request);
  const body = await request.formData();
  const dataArrayString = body.get("items")?.toString() || "";
  const dataArray = JSON.parse(dataArrayString);
  const time = dataArray[0].time;
  const timeIdx: number = parseInt(body.get("time")?.toString() || "-1")
  const dayIdx: number = parseInt(body.get("day")?.toString() || "-1")
  // const timeObj = `${DATE_IN_WEEK[dayIdx + 1]}, ${TIME_ARR[timeIdx]}`
  const timeObj = {
    dayOfWeek: DATE_IN_WEEK[dayIdx + 1],
    timeOfDay: TIME_ARR[timeIdx],
    time
  }
  return redirect(`/dashboard/${JSON.stringify(timeObj)}`);
}
export default function DashboardReserve() {
  const { partitionedBy10By7, featureFlag } = useLoaderData<typeof loader>();
  const today = new Date()
  const dayOfWeek = today.getDay() - 1
  const timeOfDay = today.getHours()
  // const dayOfWeek = 3
  // const timeOfDay = 13
  const renderCardsInColumn = (roomsByBlock: any[], partitionIndex: number) => {
    const cardItems = [];
    for (let i = 0; i < roomsByBlock.length; i++) {
      const availableRoomIdArr: object[] = [];
      roomsByBlock[i].map((item: any) => {
        if (item.booked_user_id === 0) {
          availableRoomIdArr.push({ id: item.id, time: item.time });
        }
      });
      if (partitionIndex < dayOfWeek){
        cardItems.push(
          <div key={i}>
            <Card className="my-2 h-20 flex items-center justify-center rounded font-medium">
              <CardContent className="w-full h-full rounded bg-slate-500">
              </CardContent>
            </Card>
          </div>,
        );
      }
      else if (partitionIndex == dayOfWeek){
        if (timeOfDay < TIME_ARR[i]){
          cardItems.push(
            <div key={i}>
              <Card className="my-2 h-20 w-full flex items-center justify-center rounded font-medium">
                <CardContent className="w-full h-full">
                  <form method="post">
                    <input
                      type="hidden"
                      name="items"
                      value={JSON.stringify(roomsByBlock[i])}
                    />
                    <input type="hidden" name="time" value={i} />
                    <input type="hidden" name="day" value={partitionIndex} />
                    <Button
                      className={`${
                        availableRoomIdArr.length > 5
                          ? "transition ease-in-out delay-150 bg-blue-500  hover:scale-110 hover:bg-indigo-500 duration-300"
                          : availableRoomIdArr.length == 1
                          ? "transition ease-in-out delay-150 bg-red-500  hover:scale-110 hover:bg-red-400 duration-300"
                          : availableRoomIdArr.length < 5 &&
                            availableRoomIdArr.length < 1
                          ? "transition ease-in-out delay-150 bg-yellow-500  hover:scale-110 hover:bg-yellow-400 duration-300"
                          : "bg-slate-200 disabled:cursor-not-allowed"
                      } px-1 rounded text-white w-full h-20`}
                    >
                      <p>{availableRoomIdArr.length} rooms</p>
                      <p>Available</p>
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>,
          );
        }
        else{
          cardItems.push(
            <div key={i}>
              <Card className="my-2 h-20 flex items-center justify-center rounded font-medium">
                <CardContent className="w-full h-full rounded bg-slate-500">
                </CardContent>
              </Card>
            </div>,
          );
        }
      }
      else{
        cardItems.push(
          <div key={i}>
            <Card className="my-2 h-20 w-full flex items-center justify-center rounded font-medium">
              <CardContent className="w-full h-full">
                <form method="post">
                  <input
                    type="hidden"
                    name="items"
                    value={JSON.stringify(roomsByBlock[i])}
                  />
                  <input type="hidden" name="time" value={i} />
                  <input type="hidden" name="day" value={partitionIndex} />
                  <Button
                    className={`${
                      availableRoomIdArr.length > 5
                        ? "transition ease-in-out delay-150 bg-blue-500  hover:scale-110 hover:bg-indigo-500 duration-300"
                        : availableRoomIdArr.length == 1
                        ? "transition ease-in-out delay-150 bg-red-500  hover:scale-110 hover:bg-red-400 duration-300"
                        : availableRoomIdArr.length < 5 &&
                          availableRoomIdArr.length < 1
                        ? "transition ease-in-out delay-150 bg-yellow-500  hover:scale-110 hover:bg-yellow-400 duration-300"
                        : "bg-slate-200 disabled:cursor-not-allowed"
                    } px-1 rounded text-white w-full h-20`}
                  >
                    <p>{availableRoomIdArr.length} rooms</p>
                    <p>Available</p>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>,
        );
      }
    }
    return cardItems;
  };

  return (
    <div>
      {featureFlag.enabled === 1 ? (
        <div>
          <p>{`${today.getHours()}:${today.getMinutes()}`}</p>
          <div className="h-screen flex">
            <div className="h-full w-15 mb-8 px-2">
              <p className="pt-7 pb-14">8:AM</p>
              <p className="pt-2 pb-14">10:AM</p>
              <p className="pt-2 pb-14">12:PM</p>
              <p className="pt-2 pb-14">2:PM</p>
              <p className="pt-2 pb-14">4:PM</p>
              <p className="pt-2 pb-14">6:PM</p>
              <p className="pt-2 pb-14">8:PM</p>
              <p className="">10:PM</p>
            </div>
            <div>
              <>
                <div className="grid grid-cols-7 gap-4 py-4">
                  <div className="h-full w-40" key={0}>
                    <p>Monday</p>
                    {renderCardsInColumn(partitionedBy10By7[0], 0)}
                  </div>
                  <div className="h-full w-40" key={1}>
                    <p>Tuesday</p>
                    {renderCardsInColumn(partitionedBy10By7[1], 1)}
                  </div>
                  <div className="h-full w-40" key={2}>
                    <p>Wednesday</p>
                    {renderCardsInColumn(partitionedBy10By7[2], 2)}
                  </div>
                  <div className="h-full w-40" key={3}>
                    <p>Thursday</p>
                    {renderCardsInColumn(partitionedBy10By7[3], 3)}
                  </div>
                  <div className="h-full w-40" key={4}>
                    <p>Friday</p>
                    {renderCardsInColumn(partitionedBy10By7[4], 4)}
                  </div>
                  <div className="h-full w-40" key={5}>
                    <p>Saturday</p>
                    {renderCardsInColumn(partitionedBy10By7[5], 5)}
                  </div>
                  <div className="h-full w-40" key={6}>
                    <p>Sunday</p>
                    {renderCardsInColumn(partitionedBy10By7[6], 6)}
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      ) : (
        <FeatureDisabled featureName="Reservation" />
      )}

      <Outlet />
    </div>
  );
}

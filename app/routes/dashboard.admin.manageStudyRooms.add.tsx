import { Button } from "@/components/ui/button";
import { type ActionArgs, type LoaderArgs } from "@remix-run/node";
import { createRoom } from "~/models/room.server";

export const loader = async ({ request }: LoaderArgs) => {
  return null;
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData()

  const accessible: number = body.get("accessible") === "on" ? 1 : 0;
  const power: number = body.get("power") === "on" ? 1 : 0;
  const reservable: number = body.get("reservable") === "on" ? 1 : 0;
  const softSeating: number = body.get("softSeating") === "on" ? 1 : 0;
  const tableChairs: number = body.get("tableChairs") === "on" ? 1 : 0;
  const monitor: number = body.get("monitor") === "on" ? 1 : 0;
  const whiteboard: number = body.get("whiteboard") === "on" ? 1 : 0;
  const window: number = body.get("window") === "on" ? 1 : 0;

  await createRoom({
    accessible,
    power,
    reservable,
    softSeating,
    tableChairs,
    monitor,
    whiteboard,
    window,
  });

  return null;
};

export default function AddRoom() {
  return (
    <div>
      <form method="post">
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
          <div className="items-top flex space-x-2">
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
        <Button type="submit">Add Room</Button>
      </form>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { redirect, type ActionArgs, type LoaderArgs } from "@remix-run/node";
import { Form, Outlet, useLoaderData } from "@remix-run/react";
import {
  isUserAllowedToPlaceOrder,
} from "~/models/order.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = parseInt((await requireUserId(request)).toString());
  const userAllowedToPlaceOrder: boolean = await isUserAllowedToPlaceOrder({
    userId,
  });

  const url = new URL(request.url);
  new URLSearchParams(url.search);
  return { userAllowedToPlaceOrder };
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const iced: number = body.get("condition") === "iced" ? 1 : 0;
  return redirect(`/dashboard/cafeRoy/order/${iced}`);
};

export default function CafeRoyOrder() {
  const { userAllowedToPlaceOrder } = useLoaderData<typeof loader>();
  return (
    <div>
      {userAllowedToPlaceOrder === true ? (
        <div className="">
          <Form method="post">
            <div className="flex">
              <Button
                name="condition"
                value="iced"
                className="border w-full rounded bg-orange-500 hover:bg-orange-300 text-white"
              >
                Iced
              </Button>
              <Button
                name="condition"
                value="hot"
                className="border w-full rounded bg-blue-500 hover:bg-blue-300 text-white"
              >
                Hot
              </Button>
            </div>
          </Form>
          <div>
            <Outlet />
          </div>
        </div>
      ) : (
        <div>
          <p>Reached limit of 1 order per person</p>
        </div>
      )}
    </div>
  );
}

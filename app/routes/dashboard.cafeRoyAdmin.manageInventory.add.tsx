import { Button } from "@/components/ui/button";
import { redirect, type ActionArgs, type LoaderArgs } from "@remix-run/node";
import { Form, Outlet } from "@remix-run/react";
import { createInventory } from "~/models/order.server";
import { requireUserId } from "~/session.server";

/**
 * admin insert iced or hot, name, number of inventory 
 * 
 */

export const loader = async ({ params, request }: LoaderArgs) => {
  await requireUserId(request)
  return null
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  await requireUserId(request)
  const iced: number = body.get("condition") === "iced" ? 1 : 0;
  const name: string = body.get("name") as string
  const quantity: number = parseInt(body.get("quantity") as string)
  const price: number = parseFloat(body.get("quantity") as string)
  const size: string = body.get("size") as string
  // console.log({ iced, name, quantity })
  //create SQL insert model
  await createInventory({ iced, name, quantity, size, price })
  return redirect("/dashboard/cafeRoyAdmin/manageInventory/view")
};

export default function CafeRoyManageInventoryAdd() {
  return (
    <div>
        <Form method="post">
        <div className="flex">
            <input type="radio" name="condition" value="iced" />
            <label>Iced</label>
          </div>
          <div className="flex">
            <input type="radio" name="condition" value="hot" />
            <label>Hot</label>
          </div>
          <div className="flex">
            <label>Name</label>
            <input type="text" name="name" className="border"/>
          </div>
          <label>Size</label>
          <div className="flex">
            <input type="radio" name="size" value="M" />
            <label>M</label>
          </div>
          <div className="flex">
            <input type="radio" name="size" value="L" />
            <label>L</label>
          </div>
          <div className="flex">
            <label>Price</label>
            <input type="text" name="price" className="border"/>
          </div>
          <div className="flex">
            <label>Quantity</label>
            <input type="text" name="quantity" className="border"/>
          </div>
          <Button className="border rounded bg-blue-500 hover:bg-blue-300 text-white">Submit</Button>
        </Form>
      <Outlet/>
    </div>
  );
}

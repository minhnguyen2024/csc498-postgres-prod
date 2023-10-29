import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { redirect, type ActionArgs, type LoaderArgs } from "@remix-run/node";
import { Form, Outlet} from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { createUser } from "~/models/user.server";


export const loader = async ({ params, request }: LoaderArgs) => {
  await requireUserId(request)
  return null;
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  await requireUserId(request)
  const username: string = body.get("username") as string;
  const password: string = body.get("password") as string;
  const permission: number = parseInt(body.get("permission") as string);
  await createUser({ username, password, permission });
  return redirect("/dashboard/cafeRoyAdmin/manageInventory/view");
};

export default function AdminManageUsersAdd() {
  return (
    <div>
      <Form method="post">
        <div className="flex">
          <label>Username</label>
          <input type="text" name="username" className="border" />
        </div>
        <div className="flex">
          <label>Password</label>
          <input type="text" name="password" className="border" />
        </div>
        <Select name="permission">
          <SelectTrigger className="w-[100px] border-2 border-black rounded px-2">
            <SelectValue placeholder="Permission" />
          </SelectTrigger>
          <SelectContent className="w-[100px] bg-slate-100">
            <SelectGroup>
              <div className="hover:bg-slate-300 p-2">
                <SelectItem value="0">Student</SelectItem>
              </div>
              <div className="hover:bg-slate-300 p-2">
                <SelectItem value="2">Cafe Roy Employee</SelectItem>
              </div>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button className="border rounded bg-blue-500 hover:bg-blue-300 text-white">
          Submit
        </Button>
      </Form>
      <Outlet />
    </div>
  );
}

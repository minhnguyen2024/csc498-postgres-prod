import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog";

import {
  redirect,
  type ActionArgs,
  type LoaderArgs,
  json,
} from "@remix-run/node";
import { Form, Outlet, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useRef } from "react";

import { requireUserId } from "~/session.server";
import { X } from "lucide-react";
import {
  User,
  addFundToUserByUserId,
  deleteUser,
  getUserById,
} from "~/models/user.server";
import invariant from "tiny-invariant";

export const loader = async ({ params, request }: LoaderArgs) => {
  await requireUserId(request);
  invariant(params.userId, "userId not found");
  const users = await getUserById(parseInt(params.userId));
  const user: User = users[0];
  return { user };
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const _action = body.get("_action");
  const id = body.get("id");
  if (_action === null || id === null) {
    throw new Error("_action or id does not exist");
  }
  switch (_action.toString()) {
    case "addFund":
      let amount = body.get("amount");
      if (amount === null) {
        throw new Error("anount does not exist");
      }
      await addFundToUserByUserId({
        userId: parseInt(id.toString()),
        amount: parseFloat(amount.toString()),
      });
      return redirect("");
    case "deleteUser":
      const confirmUsername = body.get("confirmUsername")?.toString() || "";
      const username = body.get("username")?.toString() || "";
      const deleteUserId = parseInt(id.toString() || "0");
      if (deleteUserId === 0) {
        return json(
          {
            errors: {
              message: "User does not exist",
            },
          },
          { status: 400 },
        );
      }
      if (confirmUsername !== username) {
        return json(
          {
            errors: {
              message: "Username does not match",
            },
          },
          { status: 400 },
        );
      }
      await deleteUser({ id: deleteUserId });
      return redirect("/dashboard/admin/manageUsers");
    default:
      throw new Error("_action does not exist");
  }
};

export default function AdminManageUsers() {
  const { user } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const messageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.message) {
      messageRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div>
      <div className="flex justify-between p-4">
        <div>
          <p>User ID: {user.id}</p>
          <p>Username: {user.username}</p>
          <p>
            Permission:{" "}
            {user.admin === 0
              ? "Student"
              : user.admin === 2
              ? "Cafe Roy Employee"
              : "Admin"}
          </p>
          <p>Current Balance: {user.accountBalance}</p>
        </div>
        <div className="flex-box">
          <div className="my-2">
            <Dialog.Root>
              <Dialog.Trigger className="rounded p-2 hover:bg-green-400 bg-green-500 w-32">
                Add Balance
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                <Dialog.Content className="fixed bg-white text-grey-900 p-8 shadow rounded top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="flex justify-between">
                    <div>
                      <h2 className="text-xl">Add fund to exisiting balance</h2>
                    </div>
                    <div>
                      <Dialog.Close className="text-grey-400 hover:text-grey-500">
                        <X />
                      </Dialog.Close>
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <Form method="post">
                      <p>Current Balance: ${user.accountBalance}</p>
                      <input type="hidden" name="_action" value="addFund" />
                      <label>Amount</label>
                      <input type="text" name="amount" className="border" />
                      <input type="hidden" name="id" value={user.id} />
                      <Button
                        className={`my-2 mx-2 rounded bg-green-500 hover:bg-green-400 px-4 py-2 font-medium text-white`}
                        type="submit"
                      >
                        Save
                      </Button>
                    </Form>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
          <div>
            <Dialog.Root>
              <Dialog.Trigger className="rounded p-2 hover:bg-red-400 bg-red-500 w-32">
                Delete User
              </Dialog.Trigger>
              <Dialog.Overlay className="fixed inset-0 bg-black/50" />
              <Dialog.Content className="fixed bg-white text-grey-900 p-8 shadow rounded top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex justify-between">
                  <div>
                    <p>This action is not reversible.</p>
                    <p>
                      Please re-enter{" "}{<p className="font-bold">{user.username}</p>}
                    </p>
                  </div>
                  <div>
                    <Dialog.Close className="text-grey-400 hover:text-grey-500">
                      <X />
                    </Dialog.Close>
                  </div>
                </div>

                <div className="flex justify-center items-center">
                  <Form method="post">
                    <input
                      type="text"
                      ref={messageRef}
                      name="confirmUsername"
                      className="border"
                    />
                    
                    <input type="hidden" name="_action" value="deleteUser" />
                    <input type="hidden" name="id" value={user.id} />
                    <input
                      type="hidden"
                      name="username"
                      value={user.username}
                    />
                    <Button
                      type="submit"
                      className={`my-2 mx-2 rounded bg-red-500 hover:bg-red-400 px-4 py-2 font-medium text-white`}
                    >
                      Confirm
                    </Button>
                    {actionData?.errors?.message ? (
                      <p className="pt-1 text-red-700" id="password-error">
                        {actionData.errors.message}
                      </p>
                    ) : null}
                  </Form>

                </div>
              </Dialog.Content>
            </Dialog.Root>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

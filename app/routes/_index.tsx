import { json, redirect, type LoaderArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { requireUserId } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  if (!userId) {
    redirect("login");
  } else {
    redirect("dashboard");
  }
  return json({});
};

export default function Index() {
  return (
    <div className="flex items-center justify-center h-screen">
      <title>Authentication</title>
      <div className="">
        <Link
          to="/login"
          className="flex items-center justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"
        >
          Log In
        </Link>
      </div>
    </div>
  );
}

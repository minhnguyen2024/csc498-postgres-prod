import { LoaderArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
export async function loader({ request }: LoaderArgs) {
  return null
}

export default function AdminManageUsers() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

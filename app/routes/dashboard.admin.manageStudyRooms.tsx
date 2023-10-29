import { toggleFeature } from "~/models/manage.server";
import { redirect, type LoaderArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";


export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  let viewRooms = search.get("view-rooms");
  if (viewRooms) {
    return redirect("/dashboard/admin/manageStudyRooms/view");
  }
  let addRoom = search.get("add-room");
  if (addRoom) {
    return redirect("/dashboard/admin/manageStudyRooms/add");
  }
  let updateRoom = search.get("update-room");
  if (updateRoom) {
    return redirect("/dashboard/admin/manageStudyRooms/update");
  }
  let deleteRoom = search.get("delete-room");
  if (deleteRoom) {
    return redirect("/dashboard/admin/manageStudyRooms/delete");
  }

  await toggleFeature();
  return null;
};

export default function AdminManageStudyRooms() {
  return (
    <div>
        <Outlet />
    </div>
  );
}

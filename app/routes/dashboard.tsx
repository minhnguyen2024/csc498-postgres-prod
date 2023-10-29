import { type LoaderArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { getAllUsers, getUserById } from "~/models/user.server";
import { requireUserId } from "~/session.server";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ListItem } from "~/components/ListItem";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  await getAllUsers();
  const user: any = await getUserById(userId);
  return { user: user[0] };
}

export async function action() {
  return null
}

export default function DashboardIndex() {
  const { user } = useLoaderData<typeof loader>();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const listStyle = (childRoute: any) => {
    return `w-full ${
      location.pathname.includes(childRoute)
        ? "bg-slate-400 hover:bg-slate-300 rounded"
        : "bg-slate-200 hover:bg-slate-300"
    } my-2 flex items-center justify-center py-3 font-medium text-grey-100`;
  };
  return (
    <>
      <div className="flex flex-row h-screen">
        <div className={`${sidebarOpen ? `w-80` : `w-0`} h-screen bg-slate-200 transition-all duration-300 ease-in-out`}>
          <ul className="p-3 h-screen">
            <div className="my-2 flex items-center justify-center rounded bg-yellow-500 py-3 font-medium text-white hover:bg-yellow-600">
              <p>Welcome, {user.username}</p>
            </div>
            {user.admin == 1 ? (
              <>
                {sidebarOpen ? (
                  <>
                    <li className={listStyle("admin/manageUsers/view")}>
                      <Link to="/dashboard/admin/manageUsers/view" className="">
                        Users
                      </Link>
                    </li>
                    <li className={listStyle("dashboard/admin/manageFeatures")}>
                      <Link to="/dashboard/admin/manageFeatures" className="">
                        Application Features
                      </Link>
                    </li>
                    <li className={listStyle("manageRooms")}>
                      <Link to="manageRooms" className="">
                        Study Rooms
                      </Link>
                    </li>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : user.admin == 0 ? (
              <>
                {sidebarOpen ? (
                  <>
                    <li className={listStyle("reserve")}>
                      <Link to="reserve" className="">
                        Reserve a Study Room
                      </Link>
                    </li>
                    <li className={listStyle("dashboard/reservationStatus")}>
                      <Link to="/dashboard/reservationStatus" className="">
                        Check Resvervation Status
                      </Link>
                    </li>
                    <li>
                      <NavigationMenu className="bg-yellow-500 rounded">
                        <NavigationMenuList>
                          <NavigationMenuItem className="flex items-center justify-center">
                            <NavigationMenuTrigger className="justify-center font-medium text-white">
                              Cafe Roy
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="flex-box">
                              <NavigationMenuLink>
                                <ul className="flex-box gap-3 p-6 lg:grid-cols-[.75fr_1fr] bg-slate-300">
                                  <li className="my-2">
                                    <ListItem
                                      href="/dashboard/cafeRoy/order"
                                      title="Make an Order"
                                      className="bg-green-500 hover:bg-green-300 rounded"
                                    />
                                  </li>
                                  <li className="my-2">
                                    <ListItem
                                      href="/dashboard/cafeRoy/viewOrder"
                                      className="bg-green-500 hover:bg-green-300 rounded"
                                      title="Order Status"
                                    />
                                  </li>
                                  <li className="my-2">
                                    <ListItem
                                      href="/dashboard/cafeRoy/orderHistory"
                                      className="bg-green-500 hover:bg-green-300 rounded"
                                      title="Order History"
                                    />
                                  </li>
                                </ul>
                              </NavigationMenuLink>
                            </NavigationMenuContent>
                          </NavigationMenuItem>
                        </NavigationMenuList>
                      </NavigationMenu>
                    </li>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                {sidebarOpen ? (
                  <>
                    <li className={listStyle("cafeRoyAdmin/viewOrders")}>
                      <Link
                        to="/dashboard/cafeRoyAdmin/viewOrders"
                        className=""
                      >
                        View Orders
                      </Link>
                    </li>
                    <li
                      className={listStyle("cafeRoyAdmin/manageInventory/view")}
                    >
                      <Link
                        to="/dashboard/cafeRoyAdmin/manageInventory/view"
                        className=""
                      >
                        Manage Inventory
                      </Link>
                    </li>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
            {/** Logout Button div */}
            <div className=" mt-2">
              <li className="bottom-0 my-2 mt-auto flex items-center justify-center rounded bg-red-500 py-3 font-medium text-white hover:bg-red-600">
                <div>
                  {user ? (
                    <div className="user-info">
                      <form action="/logout" method="post">
                        <Button type="submit" className="">
                          Logout
                        </Button>
                      </form>
                    </div>
                  ) : (
                    <Link to="/login">Login</Link>
                  )}
                </div>
              </li>
            </div>
          </ul>
        </div>
        {sidebarOpen ? (
          <>
            <div className="flex justify-center items-center h-screen w-6">
              <button
                className="text-center bg-slate-300 h-16 rounded-tr-xl rounded-br-xl"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <ChevronLeft />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center items-center h-screen">
              <button
                className="text-center bg-slate-300 h-16 rounded-tr-xl rounded-br-xl"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <ChevronRight />
              </button>
            </div>
          </>
        )}
        <div className={`overflow-y-scroll ${sidebarOpen === false? "w-screen " : "w-[950px]"}`}>
          <Outlet/>
        </div>
      </div>
    </>
  );
}



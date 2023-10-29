import { type LoaderArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getFeatureByName, type Feature } from "~/models/manage.server";
import { requireUserId } from "~/session.server";
import FeatureDisabled from "./error.featureDisabled";

export async function loader({ request }: LoaderArgs) {
  await requireUserId(request);
  const featureFlag: Feature[] = await getFeatureByName("adminCafeRoy");

  return { featureFlag: featureFlag[0] };
}

export default function CafeRoyAdmin() {
  const { featureFlag } = useLoaderData<typeof loader>();
  return (
    <div className="h-screen">
      {featureFlag.enabled == 1 ? (
        <Outlet />
      ) : (
        <FeatureDisabled featureName="Cafe Roy Admin" />
      )}
    </div>
  );
}
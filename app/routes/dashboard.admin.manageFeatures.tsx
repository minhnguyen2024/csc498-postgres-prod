import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";

import { type LoaderArgs, type ActionArgs, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { toggleFeature, updateFeatureByName } from "~/models/manage.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  await requireUserId(request);
  const features = await toggleFeature();
  return features;
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const featureStatus = body.get("featureStatus")?.toString();
  const featureName = body.get("featureName")?.toString();
  invariant(featureName, "featureName not found");
  invariant(featureStatus, "featureStatus not found");
  await updateFeatureByName({
    featureName,
    featureStatus,
  });
  return redirect("/dashboard/admin/manageFeatures");
};
type Feature = {
  id: number;
  featureName: string;
  enabled: number;
};
export default function ManageFeatures() {
  const features: Feature[] = useLoaderData<typeof loader>();

  return (
    <div className="">
      <p>Feature Flags</p>
      <Table>
        <TableBody>
          <TableRow>
            <TableHead>Feature Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
          {features.map((feature: Feature) => (
         
              <TableRow key={feature.id} className="border-b hover:bg-slate-400">
                <TableCell>{feature.featureName}</TableCell>
                <TableCell>
                  <Form method="post">
                    <input
                      type="hidden"
                      value={feature.enabled}
                      name="featureStatus"
                    />
                    <input
                      type="hidden"
                      value={feature.featureName}
                      name="featureName"
                    />
                    {feature.enabled == 1 ? (
                      <Button className="bg-green-500 rounded w-24 hover:bg-green-300">
                        Enabled
                      </Button>
                    ) : (
                      <Button className="bg-red-500 rounded w-24 hover:bg-red-300">
                        Disabled
                      </Button>
                    )}
                  </Form>
                </TableCell>
                <TableCell>
                  {feature.featureName === "reserveStudyRoom" &&
                  feature.enabled == 0 ? (
                    <Link
                      to="/dashboard/admin/manageStudyRooms/view"
                      className="bg-green-500 rounded hover:bg-green-300 p-3"
                    >
                      Manage Reserve Study Room
                    </Link>
                  ) : (
                    <></>
                  )}
                  {feature.featureName === "orderCafeRoy" &&
                  feature.enabled == 0 ? (
                    <Link
                      to="/admin"
                      className="bg-green-500 rounded hover:bg-green-300 py-3"
                    >
                      Manage Cafe Roy
                    </Link>
                  ) : (
                    <></>
                  )}
                </TableCell>
              </TableRow>
          
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

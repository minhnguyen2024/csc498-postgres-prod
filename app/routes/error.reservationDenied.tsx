import { Link } from "@remix-run/react";

export default function ReservationDenied() {
  return (
    <div>
      <p>
        You have passed the limit of 1 reservation per person. Please cancel
        your current reservation if you wish to continue.
      </p>
      <Link
        className="flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"
        to="/dashboard/reservationStatus"
      >
        Check Reservation Status
      </Link>
    </div>
  );
}

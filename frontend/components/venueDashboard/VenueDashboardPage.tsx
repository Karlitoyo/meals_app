import React, { useEffect, useState } from "react";
import CreateAvailabilityForm from "./availabilityConfirm";

interface VenueData {
  firstName: string;
  lastName: string;
  email: string;
}

export default function VenueDashboardPage({
  venueId,
  token,
}): React.ReactElement {
  const [venueData, setVenueData] = useState<VenueData>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Venue ID:", venueId);
    console.log("Token:", token);
    if (!venueId || !token) {
      setError("Missing venue ID or token.");
      return;
    }

    const fetchVenueInfo = async () => {
      try {
        console.log("Fetching venue data...", venueId, token);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/venues/${venueId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch venue data");
        }

        const data = await response.json();
        setVenueData(data);
      } catch (error) {
        console.error("Error fetching venue data:", error);
        setError(error.message);
      }
    };

    fetchVenueInfo();
  }, [venueId, token]);

  if (error) return <div>Error: {error}</div>;
  if (!venueData) return <div>Loading user information...</div>;


  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {/* Analytics Summary */}
      <div className="lg:col-span-3 p-4 bg-white rounded shadow">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold">
              Good afternoon, {venueData?.firstName || "Guest"}
            </h2>
            <p className="text-gray-500">
              Here's what's happening with your projects today.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="stat bg-white shadow p-4 rounded">
          <div className="stat-title">Bounce Rate</div>
          <div className="stat-value text-primary">47.74%</div>
          <div className="stat-desc">+2.01% from last 30 days</div>
        </div>
        <div className="stat bg-white shadow p-4 rounded">
          <div className="stat-title">New Sessions</div>
          <div className="stat-value text-secondary">76.40%</div>
          <div className="stat-desc">+1.96% from last 30 days</div>
        </div>
        <div className="stat bg-white shadow p-4 rounded">
          <div className="stat-title">Pages / Session</div>
          <div className="stat-value text-accent">2.15</div>
          <div className="stat-desc">-0.18% from last 30 days</div>
        </div>
      </div>

      {/* Users by Device */}
      <div className="lg:col-span-2 p-4 bg-white rounded shadow">
        <h3 className="text-lg font-bold mb-4">Sessions by Device Type</h3>
        <div className="flex">
          <div className="flex-1">
            <p>Desktop</p>
            <progress
              className="progress progress-primary w-full"
              value="51.5"
              max="100"
            ></progress>
          </div>
          <div className="flex-1">
            <p>Mobile</p>
            <progress
              className="progress progress-secondary w-full"
              value="34.4"
              max="100"
            ></progress>
          </div>
          <div className="flex-1">
            <p>Tablet</p>
            <progress
              className="progress progress-accent w-full"
              value="20.8"
              max="100"
            ></progress>
          </div>
        </div>
      </div>

      {/* Users by Country */}
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-lg font-bold mb-4">Users by Country</h3>
        <ul>
          <li className="flex justify-between">
            <span>United States</span>
            <span>21,402</span>
          </li>
          <li className="flex justify-between">
            <span>United Kingdom</span>
            <span>14,542</span>
          </li>
          <li className="flex justify-between">
            <span>India</span>
            <span>13,212</span>
          </li>
          <li className="flex justify-between">
            <span>Germany</span>
            <span>12,542</span>
          </li>
          <li className="flex justify-between">
            <span>Mexico</span>
            <span>10,142</span>
          </li>
        </ul>
      </div>
      {/* Users by Country */}
      <CreateAvailabilityForm venueId={venueId} />
    </div>
  );
}

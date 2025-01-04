import React, { useEffect, useState } from "react";
import { VenueProfileProps } from "../../interfaces/venue-dashboard";
import nookies from "nookies";

export default function VenueDashboardPage({
  userId,
  token,
}: VenueProfileProps): React.ReactElement {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = nookies.get(null).token; // Get the token from cookies

    if (token) {
      // Make the GET request using fetch
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/venues/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,  // Add the token in the Authorization header
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          return response.json(); // Parse the JSON response
        })
        .then((data) => {
          setUserData(data); // Set the user data
        })
        .catch((err) => {
          setError(err.message); // Handle errors
          console.error(err);
        });
    } else {
      setError('No token found');
    }
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!userData) return <p>Loading user information...</p>;

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {/* Analytics Summary */}
      <div className="lg:col-span-3 p-4 bg-white rounded shadow">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold">
              Good afternoon, {userData?.firstName || "Guest"}
            </h2>
            <p className="text-gray-500">
              Here's what's happening with your projects today.
            </p>
          </div>
          {/* <button className="btn btn-primary">What's New?</button> */}
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
    </div>
  );
}

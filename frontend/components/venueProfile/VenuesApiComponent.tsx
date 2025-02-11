import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import nookies from "nookies";

interface Venue {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  phone?: string;
  isActive?: boolean;
  createdAt: Date;
  isVenue?: boolean;
}

interface VenueProps {
  venueId: number;
  token: string;
}

export const VenueList: React.FC<VenueProps> = ({ venueId, token }) => {
  const [error, setError] = useState(null);
  const [venue, setVenue] = useState(null);

  const fetchVenueData = async (venueId: number, token: string) => {
    try {
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

      return data;
    } catch (error) {
      console.error("Error fetching venue data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const data = await fetchVenueData(venueId, token);

        setVenue(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchVenue();
  }, [venueId, token]);

  if (error) return;

  {
    error;
  }

  if (!venue) return <div>Loading venue information...</div>;
  return (
    <div className="venue-details">
      <h2>Venue Details</h2>
      <p>
        Name: {venue.firstName} {venue.lastName}
      </p>
      <p>Email: {venue.email}</p>
      <p>
        Address: {venue.address}, {venue.city}, {venue.state}, {venue.zip},{" "}
        {venue.country}
      </p>
      <p>Phone: {venue.phone}</p>
      <p>Status: {venue.isActive ? "Active" : "Inactive"}</p>
      <p>Created At: {new Date(venue.createdAt).toLocaleDateString()}</p>
      <p>Type: {venue.isVenue ? "Venue" : "Not a Venue"}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);

  const token = cookies.token || null;

  const venueId = parseInt(cookies.venueId || "0", 10); // Assuming venueId is stored in cookies

  if (!venueId) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      token,
      venueId,
    },
  };
};

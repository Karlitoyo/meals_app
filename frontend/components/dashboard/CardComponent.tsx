import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { CardProps } from "../../interfaces/dashboard-card-comp";
import jwt, { JwtPayload } from "jsonwebtoken";

interface BookingComponentProps {
  token: string | null;
  userId?: number;
  venueId?: number;
}

interface DecodedToken extends JwtPayload {
  sub: string;
  isVenue: boolean;
  isUser: boolean;
}

export const Card: React.FC<CardProps & BookingComponentProps> = ({
  service,
  token,
  userId,
  venueId,
}) => {
  const router = useRouter();
  const [venueData, setVenueData] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelect = () => {
    router.push(`/bookings/${service.id}`); // Navigate to the booking page with the service ID
  };

  useEffect(() => {
    console.log("Venue ID:", venueId);
    console.log("Token:", token);
    if (!venueId || !token) {
      setError("Missing venue ID or token.");
      return;
    }

    const handleConfirmBooking = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/venues/all`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Include cookies with the request
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch venue data");
        }

        const token = await response.json();
        console.log("Venue data:", token);
        setVenueData(token);
      } catch (error) {
        console.error("Error fetching venue data:", error);
        setError(error.message);
      }
    };
    handleConfirmBooking();
  }, [venueId, token]);

  return (
    <div
      className="card w-full bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
      onClick={handleSelect}
    >
      {/* Image Section */}
      <div className="w-full h-48 bg-gray-200">
        <img
          src={service.imageUrl}
          alt={service.title}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Content Section */}
      <div className="p-6">
        <h2 className="card-title text-xl font-bold mb-2">{service.title}</h2>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <p className="text-blue-600 font-semibold">{service.price}</p>
      </div>
    </div>
  );
};

export default Card;

export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.token;

  if (!token) {
    console.error("No token found in cookies.");
    return {
      props: {
        token: "",
        venueId: null,
      },
    };
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.SECRET_KEY
    ) as DecodedToken;
    const userId = decodedToken.sub;
    const isVenue = decodedToken.isVenue;
    const isUser = decodedToken.isUser;

    if (!userId) {
      console.error("No 'sub' claim found in token.");
      return {
        props: {
          token,
          userId: null,
        },
      };
    }

    console.log("Decoded token:", decodedToken);
    console.log("User ID:", userId);

    return {
      props: {
        token,
        userId: Number(userId),
        isVenue,
        isUser,
      },
    };
  } catch (error) {
    console.error("Invalid token:", error);
    return {
      props: {
        token: "",
        userId: null,
      },
    };
  }
}

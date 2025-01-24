import { useRouter } from "next/router";
import Calendar from "react-calendar";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout"; // Import Layout directly if needed
import { createBooking } from "../api/bookings_api"; // Import the API function
import "react-calendar/dist/Calendar.css"; // Import calendar styles
import jwt, { JwtPayload } from "jsonwebtoken";

interface BookingComponentProps {
  token: string | null;
  userId?: number;
}

interface DecodedToken extends JwtPayload {
  sub: string;
  isVenue: boolean;
  isUser: boolean;
}

const BookingComponent: React.FC<BookingComponentProps> = ({
  token,
  userId,
}) => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("12:00");
  console.log("selectedDate:", selectedDate);
  console.log("token:", token);
  console.log("userId:", userId);
  useEffect(() => {
    if (!token) {
      setError("You must be logged in to book a service.");
    }
  }, [token]);

  if (!token) {
    return <p>{error}</p>;
  }

  const handleConfirmBooking = async () => {
    if (!selectedDate) {
      setMessage("Please select a date to proceed!");
      return;
    }

    // Create start time by combining date and time
    const startTime = new Date(selectedDate);
    const [hours, minutes] = selectedTime.split(":");
    startTime.setHours(parseInt(hours), parseInt(minutes));

    // Create end time (1 hour later)
    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + 1);

    // Format to ISO strings
    const startTimeISO = startTime.toISOString();
    const endTimeISO = endTime.toISOString();

    const bookingData = {
      userId,
      venueId: Number(userId),
      startTime,
      endTime: endTimeISO,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/createBooking`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies with the request
          body: JSON.stringify(bookingData),
        }
      );

      const token = await response.json();

      await createBooking(
        {
          userId: userId,
          venueId: Number(userId),
          startTime,
          endTime: endTimeISO,
        },
        token
      );

      if (response.ok) {
        setMessage(
          `Booking confirmed for Venue ID: ${userId} on ${selectedDate.toDateString()}`
        );
      } else {
        setMessage(token.message || "Failed to confirm booking.");
      }
    } catch (error) {
      setMessage("An error occurred while confirming the booking.");
    }
  };

  return (
    <Layout title={`Booking for Venue ID: ${userId}`}>
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">
            Booking Page for Venue ID: {userId}
          </h1>
          <div className="flex flex-col items-center">
            {/* Calendar Component */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
              <Calendar onChange={(value) => setSelectedDate(value as Date)} value={selectedDate} />
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="mt-4 p-2 border rounded"
              />
            </div>

            {/* Confirm Button */}
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              onClick={handleConfirmBooking}
            >
              Confirm Booking
            </button>

            {/* Message */}
            {message && (
              <div className="mt-4 text-center">
                <p
                  className={`text-lg ${
                    message.startsWith("Booking confirmed")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {message}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingComponent;

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

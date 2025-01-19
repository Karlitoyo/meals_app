import { useRouter } from "next/router";
import Calendar from "react-calendar";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout"; // Import Layout directly if needed
import { createBooking } from "../api/bookings_api"; // Import the API function
import "react-calendar/dist/Calendar.css"; // Import calendar styles

interface BookingComponentProps {
  isAuthenticated: boolean;
}

const BookingComponent: React.FC<BookingComponentProps> = ({ isAuthenticated }) => {
  const router = useRouter();
  const { id } = router.query; // Extract the `id` parameter from the URL
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setError('You must be logged in to book a service.');
    }
  }, [isAuthenticated]);

if (!isAuthenticated) {
  return <p>{error}</p>;
}

const handleConfirmBooking = async () => {
    if (!selectedDate) {
      setMessage("Please select a date to proceed!");
      return;
    }

      const startTime = selectedDate.toISOString(); // Assume booking is for a full day
      const endTime = new Date(selectedDate);
      endTime.setDate(endTime.getDate() + 1); // Add one day for the end time
      const endTimeISO = endTime.toISOString();

      try {
        const response = await fetch('/api/confirmBooking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            venueId: Number(id),
            startTime,
            endTime: endTimeISO,
          }),
        });

      const token = await response.json();

      await createBooking({
        bookingData: {
          userId: 1, // Replace with actual user ID from your authentication system
          venueId: Number(id),
          startTime,
          endTime: endTimeISO,
        },
        token
      });

      
      if (response.ok) {
        setMessage(`Booking confirmed for Venue ID: ${id} on ${selectedDate.toDateString()}`);
      } else {
        setMessage(token.message || 'Failed to confirm booking.');
      }
    } catch (error) {
      setMessage('An error occurred while confirming the booking.');
    }
  };

  return (
    <Layout title={`Booking for Venue ID: ${id}`}>
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">
            Booking Page for Venue ID: {id}
          </h1>
          <div className="flex flex-col items-center">
            {/* Calendar Component */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
              <Calendar
                onChange={(date: Date) => setSelectedDate(date)}
                value={selectedDate}
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
                <p className={`text-lg ${message.startsWith("Booking confirmed") ? "text-green-600" : "text-red-600"}`}>
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

interface ServerSideContext {
  req: {
    cookies: {
      token?: string;
    };
  };
}

interface ServerSideProps {
  props: {
    isAuthenticated: boolean;
  };
}

export async function getServerSideProps(context: ServerSideContext): Promise<ServerSideProps> {
  const { req } = context;
  const token = req.cookies.token; // Access the token from cookies

  if (!token) {
    return {
      props: {
        isAuthenticated: false,
      },
    };
  }

  return {
    props: {
      isAuthenticated: true,
    },
  };
}

export default BookingComponent;
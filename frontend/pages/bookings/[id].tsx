import { useRouter } from "next/router";
import Calendar from "react-calendar";
import React, { useState } from "react";
import Layout from "../../components/Layout"; // Import Layout directly if needed

const BookingComponent: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Extract the `id` parameter from the URL
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleConfirmBooking = () => {
    if (selectedDate) {
      alert(
        `Booking confirmed for Service ID: ${id} on ${selectedDate.toDateString()}`
      );
    } else {
      alert("Please select a date to proceed!");
    }
  };
  return (
    <Layout title={`Booking for Service ID: ${id}`}>
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">
            Booking Page for Service ID: {id}
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingComponent;

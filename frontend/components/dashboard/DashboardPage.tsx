import React from "react";
import Card from "./CardComponent";
import { services } from "../../public/shared/constants/constants";
import { useRouter } from 'next/router';

export default function DashboardPage() {
    const router = useRouter();

    const handleCardClick = (id: number) => {
      router.push(`/bookings/${id}`); // Redirect to the booking page for the selected service
    };
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Global Meals</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card
              key={service.id}
              service={service}
              onSelect={() => handleCardClick(service.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

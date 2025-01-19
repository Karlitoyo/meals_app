import React from "react";
import { useRouter } from "next/router";
import { CardProps } from "../../interfaces/dashboard-card-comp";

const Card: React.FC<CardProps> = ({ service }) => {
  const router = useRouter();

  const handleSelect = () => {
    router.push(`/bookings/${service.id}`); // Navigate to the booking page with the service ID
  };

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


import React from "react";
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
}) => {
  const router = useRouter();
  const imageUrl = service.imageUrl
    ? service.imageUrl.startsWith("http")
      ? service.imageUrl
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}${service.imageUrl}`
    : "/default-placeholder.jpg"; // Fallback image

  console.log("Image URL:", imageUrl);

  const handleSelect = () => {
    router.push({
      pathname: `/bookings/${service.id}`, // Dynamic route
      query: {
        title: service.title,
        description: service.description,
        price: service.price,
        firstName: service.firstName,
        lastName: service.lastName,
      },
    });
  };

  return (
    <div
      className="card w-full bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
      onClick={handleSelect}
    >
      {/* Image Section */}
      <div className="w-full h-48 bg-gray-200">
        <img
          src={imageUrl}
          alt={service.title}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Content Section */}
      <div className="p-6">
        <h2 className="card-title text-xl font-bold mb-2">{service.title}</h2>
        <p className="text-gray-600 mb-4">{service.firstName}</p>
        <p className="text-gray-600 mb-4">{service.lastName}</p>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <p className="text-gray-600 mb-4">{service.id}</p>
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

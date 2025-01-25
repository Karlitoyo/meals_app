import React from "react";
import Card from "./CardComponent";
import { services } from "../../public/shared/constants/constants";
import { useRouter } from 'next/router';
import jwt, { JwtPayload } from "jsonwebtoken";
import { GetServerSidePropsContext } from 'next';

interface Service {
  id: number;
  // Add other service properties based on your constants file
}

interface DashboardPageProps {
  token: string;
  userId: number | null;
  isVenue?: boolean;
  isUser?: boolean;
  venueId?: number;
}

interface DecodedToken extends JwtPayload {
  sub: string;
  isVenue: boolean;
  isUser: boolean;
}

interface ServerSideProps {
  props: {
    token: string;
    userId?: number | null;
    isVenue?: boolean;
    isUser?: boolean;
    venueId?: number | null;
  };
}

const DashboardPage: React.FC<DashboardPageProps> = ({ userId, token }) => {
    const router = useRouter();
  console.log("User ID - dash:", userId);
  console.log("Token - dash:", token);
  const handleCardClick = (id: number): void => {
      router.push(`/bookings/${id}`);
    };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 mt-8">Global Meals</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service: Service) => (
            <Card token={token} venueId={userId}
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

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<ServerSideProps> {
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
      process.env.SECRET_KEY as string
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

export default DashboardPage;

import { GetServerSideProps } from "next";

import VenueDashboardPage from "../components/venueDashboard/VenueDashboardPage";

import nookies from "nookies";

import { JwtService } from "@nestjs/jwt";

import * as dotenv from "dotenv";

dotenv.config();

const Dashboard = ({
  userId,
  token,
}: {
  userId: string | null;
  token: string;
}) => {
  return <VenueDashboardPage userId={userId} token={token} />;
};

const jwtService = new JwtService();

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);

  const token = cookies.token;

  if (!token) {
    console.log("No token found in cookies");

    return {
      redirect: {
        destination: "/login",

        permanent: false,
      },
    };
  }

  try {
    const secret = process.env.SECRET_KEY;

    if (!secret) {
      throw new Error("Secret key is not defined");
    }

    const decodedToken: any = jwtService.verify(token, { secret });

    const userId = decodedToken.sub || decodedToken.id || null; // Ensure userId is extracted correctly

    return {
      props: {
        userId,
        token,
      },
    };
  } catch (error) {
    console.log("Redirecting to login due to error:", error);

    return {
      redirect: {
        destination: "/venueLogin",

        permanent: false,
      },
    };
  }
};

export default Dashboard;

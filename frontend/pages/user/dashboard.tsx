import Layout from "../../components/Layout";
import DashboardPage from "../../components/dashboard/DashboardPage";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
    sub: string;
    isVenue: boolean;
    isUser: boolean;
  }
  
  interface DashboardPageProps {
    userId: number;
    token: string | null;
    isVenue: boolean;
    isUser: boolean;
  }


const Dashboard = ({ userId, token, isUser, isVenue }: DashboardPageProps): JSX.Element => (
  <Layout title="Dashboard Page | Meals App" token={token} isUser={isUser} isVenue={isVenue} userId={userId}>
    <DashboardPage token={token} userId={userId} />
  </Layout>
);

export default Dashboard;

export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.token;

  if (!token) {
    console.error("No token found in cookies.");
    return {
      props: {
        token: '',
        venueId: null,
      },
    };
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY) as DecodedToken;
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
        token: '',
        userId: null,
      },
    };
  }
}

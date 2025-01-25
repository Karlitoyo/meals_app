import Layout from "../components/Layout";
import BookingComponent from "../pages/bookings/[id]";
import jwt, { JwtPayload } from "jsonwebtoken";

interface BookingComponentProps {
  userId: number;
  token: string | null;
  isVenue: boolean;
  isUser: boolean;
}

interface DecodedToken extends JwtPayload {
  sub: string;
  isVenue: boolean;
  isUser: boolean;
}
const Bookings = ({ userId, token, isUser, isVenue }: BookingComponentProps): JSX.Element => (
  <Layout title="Bookings Page | Venue App" token={token} isUser={isUser} isVenue={isVenue} userId={userId}>
    <BookingComponent userId={userId} token={token} />
  </Layout>
);

export default Bookings;

export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.token;
  console.log("Token bookings page:", token);
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

import Layout from "../../components/Layout";
import ProfileVenue from "../../components/venueProfile/ProfileVenuePage";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  sub: string;
  isVenue: boolean;
  isUser: boolean;
}

interface VenueDashboardPageProps {
  venueId: number;
  token: string | null;
  isVenue: boolean;
  isUser: boolean;
}

const ProfileVenuePage = ({ venueId, token, isUser, isVenue }: VenueDashboardPageProps): JSX.Element => (
  <Layout title="Profile Venue Page | Meals App" token={token} isUser={isUser} isVenue={isVenue}>
    <ProfileVenue venueId={venueId} token={token} isUser={isUser} isVenue={isVenue} />
  </Layout>
);

export default ProfileVenuePage;


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
    const venueId = decodedToken.sub;
    const isVenue = decodedToken.isVenue;
    const isUser = decodedToken.isUser;

    if (!venueId) {
      console.error("No 'sub' claim found in token.");
      return {
        props: {
          token,
          venueId: null,
        },
      };
    }

    console.log("Decoded token:", decodedToken);
    console.log("Venue ID:", venueId);

    return {
      props: {
        token,
        venueId: Number(venueId),
        isVenue,
        isUser,
      },
    };
  } catch (error) {
    console.error("Invalid token:", error);
    return {
      props: {
        token: '',
        venueId: null,
      },
    };
  }
}

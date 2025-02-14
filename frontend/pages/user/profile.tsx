import Layout from "../../components/Layout";
import ProfileVenue from "../../components/profilePage/UserProfilePage";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  sub: string;
  isVenue: boolean;
  isUser: boolean;
}

interface UserDashboardPageProps {
  token: string | null;
  isVenue: boolean;
  isUser: boolean;
  userId?: number;
}

const ProfileUserPage = ({ userId, token, isUser, isVenue }: UserDashboardPageProps): JSX.Element => (
  <Layout title="Login Venue Page | Meals App" token={token} isUser={isUser} isVenue={isVenue}>
    <ProfileVenue userId={userId} token={token} isUser={isUser} isVenue={isVenue}/>
  </Layout>
);

export default ProfileUserPage;


export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.token;

  if (!token) {
    console.error("No token found in cookies.");
    return {
      props: {
        token: '',
        userId: null,
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
    console.log("Venue ID:", userId);

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

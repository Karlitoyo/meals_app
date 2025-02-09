import Layout from "../../components/Layout";
import LoginForm from "../../components/loginPage/LoginForm";
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

const LoginPage = ({ venueId, token, isUser, isVenue }: VenueDashboardPageProps): JSX.Element => (
  <Layout title="Login Page | Meals App" token={token} isUser={isUser} isVenue={isVenue} venueId={venueId}>
    <LoginForm />
  </Layout>
);

export default LoginPage;


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

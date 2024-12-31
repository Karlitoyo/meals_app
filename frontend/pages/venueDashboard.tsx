import { GetServerSideProps } from 'next';
import VenueDashboardPage from '../components/venueDashboard/VenueDashboardPage';
import nookies from 'nookies';
import { JwtService } from '@nestjs/jwt';

const Dashboard = ({ userId, token }: { userId: string; token: string }) => {
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
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const decodedToken: any = jwtService.verify(token, { secret: process.env.SECRET_KEY! }); // Replace with your backend JWT secret
    return {
      props: {
        userId: decodedToken.id, // Adjust based on your JWT payload
        token,
      },
    };
  } catch (error) {
    console.log("redirecting to login due to error:", error);
    return {
      props: {
        token,
        // Add other decoded properties as needed
      },
    };
  }
};

export default Dashboard;

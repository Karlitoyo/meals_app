// utils/withAuth.js
import { parseCookies } from 'nookies';
import { jwtDecode } from 'jwt-decode';
import { ComponentType } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

interface AuthProps {
    isLoggedIn: boolean;
    isVenue: boolean;
    isUser: boolean;
  }

  const withAuth = (WrappedComponent: ComponentType<AuthProps>) => {
    const AuthenticatedComponent = (props: AuthProps) => {
        return WrappedComponent.propTypes.isLoggedIn
      };
  
    return AuthenticatedComponent;
  };

  export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const cookies = parseCookies(context);
    const token = cookies.token || null;
  
    if (!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  
    try {
      const decodedToken: any = jwtDecode(token);
      const isVenue = decodedToken.isVenue || false;
      const isUser = decodedToken.isUser || false;
  
      return {
        props: {
          isLoggedIn: true,
          isVenue,
          isUser,
        },
      };
    } catch (error) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  };
  
  export default withAuth;
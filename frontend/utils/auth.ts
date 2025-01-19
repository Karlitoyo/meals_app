import jwt from 'jsonwebtoken';

export function verifyToken(token) {
  try {
    // Verify the token using the same secret key used to sign it
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded; // This contains the payload (e.g., user information)
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

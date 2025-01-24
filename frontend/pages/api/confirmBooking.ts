import { verifyToken } from '../../utils/auth';
import { createBooking } from './bookings_api';

export default async function handler(req, res) {

  const token = req.cookies.token; // Access the token from the HTTP-only cookie

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = verifyToken(token);

  if (!user) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  
  if (req.method === 'POST') {
    try {
      const { venueId, startTime, endTime } = req.body;
      console.log('req.body', req.body);
      // Booking confirmation logic here
      await createBooking(
        {
          userId: user.sub, // 'sub' contains the user ID
          venueId,
          startTime,
          endTime,
        },
        token
      );
      console.log('req.body2', req.body);

      return res.status(200).json({ message: 'Booking confirmed' });
    } catch (error) {
      console.error('Error confirming booking:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

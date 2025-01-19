import { verifyToken } from '../../utils/auth'; // Adjust the import based on your project structure
import { createBooking } from './bookings_api'; // Adjust the import based on your project structure

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Booking confirmation logic here
      res.status(200).json({ message: 'Booking confirmed' });
    } catch (error) {
      console.error('Error confirming booking:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const token = req.cookies.token; // Access the token from the HTTP-only cookie

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = verifyToken(token);

  if (!user) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const { venueId, startTime, endTime } = req.body;

  try {
    await createBooking({
      userId: user.sub, // Assuming 'sub' contains the user ID
      venueId,
      startTime,
      endTime,
    });
    return res.status(200).json({ message: 'Booking confirmed' });
  } catch (error) {
    return res.status(500).json({ message: 'Booking failed', error: error.message });
  }
}

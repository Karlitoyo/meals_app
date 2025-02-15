
import { useState, useEffect } from 'react';

interface ProfileUserProps {
    userId: number;
    token: string;
    isVenue: boolean;
    isUser: boolean;
}

interface UserData {
    imageUrl: string;
    // add other venue properties as needed
}

export default function ProfileUser({ token, isUser, isVenue, userId }: ProfileUserProps) {
    const [venue, setVenue] = useState<UserData | null>(null);

    async function fetchUserVenues(userId, token) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings?userId=${userId}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include', // Include cookies in the request
        });
      
        const data = await response.json();
        console.log(data); // Should return an array of venue objects
      }

    return (
        <div>
            <h1 className="mt-16">Profile User Page</h1>
            <button onClick={() => fetchUserVenues(userId, token)}>Fetch User Venues</button>
            <div className="mt-40">
                <div>{userId}</div>
            </div>
        </div>
    )
}

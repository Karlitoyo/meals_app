import { useState, useEffect } from "react";

interface Venue {
  id: number;
  title: string;
  address: string;
  imageUrl: string | null;
}

interface ProfileUserProps {
  userId: number;
  token: string;
  isVenue: boolean;
  isUser: boolean;
}

export default function ProfileUser({
  token,
  isUser,
  isVenue,
  userId,
}: ProfileUserProps) {
  const [venue, setVenue] = useState<Venue | null>(null);

useEffect(() => {
    async function fetchUserVenues() {
        console.log("userId:", userId);
        console.log("token:", token);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings?userId=${userId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    credentials: "include",
                }
            );

            if (!response.ok) {
                console.error("Failed to fetch venues:", response.statusText);
                return;
            }

            const data: Venue = await response.json();
            setVenue(data);
            console.log("Venue:", venue[0]);
            console.log("Venue ID:", venue[0]?.id);
        } catch (error) {
            console.error("Error fetching venues:", error);
        }
    }

    if (userId && token) {
        fetchUserVenues();
    }
}, [userId, token]);

return (
    <div>
        <h1 className="mt-16">Profile User Page</h1>
        <div className="mt-40 text-center">
            {venue ? (
                <div className="flex flex-col items-center space-y-4 mt-8 p-4 rounded-lg text-white bg-gray-800">
                    <img
                        className="w-40 h-40 rounded-full"
                        src={venue[0].imageUrl}
                        alt={venue[0].title}
                    />
                    <h2>{venue[0].id}</h2>
                    <h2>{venue[0].title}</h2>
                    <p>{venue[0].address}</p>
                    {/* Add more venue details here */}
                </div>
            ) : (
                <p>Loading venue information...</p>
            )}
            <div>{userId}</div>
        </div>
    </div>
);
}

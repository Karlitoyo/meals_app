
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

export default function ProfileVenue({ token, isUser, isVenue, userId }: ProfileUserProps) {
    const [venue, setVenue] = useState<UserData | null>(null);

    useEffect(() => {
        const fetchVenue = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error("Failed to fetch venue");
                const data = await response.json();
                setVenue(data);
            } catch (error) {
                console.error(error);
            }
        };
    
        if (userId) fetchVenue();
    }, [userId, token]);
    

    return (
        <div>
            <h1 className="mt-16">Profile Venue Page</h1>
            <div className="mt-40">
                <div>{userId}</div>
            </div>
        </div>
    )
}

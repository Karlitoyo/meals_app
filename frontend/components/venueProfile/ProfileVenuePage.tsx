import { VenueList } from "./VenuesApiComponent";
import ProfilePhotoUpload from "./ProfilePhoto";
import { useState, useEffect } from 'react';

interface ProfileVenueProps {
    venueId: number;
    token: string;
    isVenue: boolean;
    isUser: boolean;
}

interface VenueData {
    imageUrl: string;
    // add other venue properties as needed
}

export default function ProfileVenue({ venueId, token, isUser, isVenue }: ProfileVenueProps) {
    const [venue, setVenue] = useState<VenueData | null>(null);

    useEffect(() => {
        const fetchVenue = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/venues/${venueId}`, {
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
    
        if (venueId) fetchVenue();
    }, [venueId, token]);
    

    return (
        <div>
            <h1 className="mt-16">Profile Venue Page</h1>
            <div className="mt-40">
            <VenueList venueId={venueId} token={token} />
            {venue && <ProfilePhotoUpload initialImageUrl={venue.imageUrl} onUpload={(file) => console.log("Uploading Venue Photo:", file)} token={token} venueId={venueId} isUser={isUser} isVenue={isVenue} />}
            </div>
        </div>
    )
}
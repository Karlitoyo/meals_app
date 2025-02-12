"use client";
import nookies from "nookies";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";

interface ProfilePhotoUploadProps {
  initialImageUrl?: string;
  venueId?: number;
  userId?: number;
  token: string;
  isVenue?: boolean;
  isUser?: boolean;
  onUpload: (file: File) => void;
}

const ProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({
  initialImageUrl,
  venueId,
  userId,
  token,
  isUser,
  isVenue,
  onUpload,
}) => {
  const [image, setImage] = useState<string | null>(initialImageUrl || null);

  const profileType = isUser ? "User" : isVenue ? "Venue" : "Unknown";
  console.log("Profile Type:", profileType);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile); // Make sure "file" matches the backend FileInterceptor field


    const uploadUrl = isVenue
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploadPhoto/venue-image`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploadPhoto/user-image`;

    const updateUrl =
      isVenue && venueId
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/venues/${venueId}`
        : isUser && userId
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}`
        : null;

    try {
      const uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) throw new Error("Upload failed");

      const data = await uploadResponse.json();
      
      if (data.imageUrl) {
        setImage(data.imageUrl);
        onUpload(selectedFile); // Notify parent component

        if (updateUrl) {
          await fetch(updateUrl, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ imageUrl: data.imageUrl }),
          });
        }
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700">
        {profileType} Profile Photo
      </h2>

      <div className="relative w-40 h-40 border-2 border-dashed border-gray-400 rounded-full flex items-center justify-center overflow-hidden">
        {image ? (
          <>
            <Image
              src={image}
              alt="Profile Preview"
              width={160}
              height={160}
              className="object-cover rounded-full"
            />
            <button
              onClick={() => setImage(null)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <>
            <Upload size={32} className="text-gray-500" />
            <p className="absolute bottom-2 text-xs text-gray-500">
              Click to Upload
            </p>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ProfilePhotoUpload;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);

  const token = cookies.token || null;

  const venueId = parseInt(cookies.venueId || "0", 10); // Assuming venueId is stored in cookies

  if (!venueId) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      token,
      venueId,
    },
  };
};

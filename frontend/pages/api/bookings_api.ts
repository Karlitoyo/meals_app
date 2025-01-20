import { Availability, Booking } from "../../interfaces/bookings_api";

export const fetcher = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}${url}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
};

// Availability Endpoints
export const getAvailability = async (
  venueId: number
): Promise<Availability[]> => fetcher(`/availability?venueId=${venueId}`);

export const checkAvailability = async (
  venueId: number,
  startTime: string,
  endTime: string
): Promise<{ isAvailable: boolean }> =>
  fetcher(
    `/availability/check?venueId=${venueId}&startTime=${startTime}&endTime=${endTime}`
  );

export const createAvailability = async (
  data: Partial<Availability>,
  token: string
): Promise<Availability> =>
  fetcher("/availability", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });

// Booking Endpoints
export const getBookings = async (
  userId: number,
  venueId: number,
  token: string
): Promise<Booking[]> =>
  fetcher(`/bookings?userId=${userId}&venueId=${venueId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createBooking = async (bookingData: any, token: string): Promise<any> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/confirmBooking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    credentials: "include", // Include cookies with the request
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create booking");
  }

  const data = await response.json();

  return data;
};

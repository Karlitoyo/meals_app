export async function getVenue(userId: string, token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/venues/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch venue data');
  }

  return response.json();
}
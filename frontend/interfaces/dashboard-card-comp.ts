export interface CardProps {
  service: { id: number; token: string | null; userId: number; venueId: number; firstName: string; capacity: string; title: string; description: string; price: string; imageUrl: string; country: string };
  onSelect: () => void;
}
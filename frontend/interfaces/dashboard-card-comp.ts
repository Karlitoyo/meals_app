export interface CardProps {
  service: { id: number; name: string; title: string; description: string; price: string; imageUrl: string };
  onSelect: () => void;
}
export interface CardProps {
  service: { id: number; title: string; description: string; price: string; imageUrl: string };
  onSelect: () => void;
}
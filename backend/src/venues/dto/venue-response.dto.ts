export class VenueResponseDto {
    id: number;
    firstName: string;
    lastName: string;
    title: string;
    description: string;
    imageUrl?: string;
    capacity?: number;
    price?: number;
    isActive: boolean;
    createdAt: Date;
  }
  
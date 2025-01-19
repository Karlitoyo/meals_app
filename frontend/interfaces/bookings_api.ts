// Types for API Responses
export interface Availability {
    id: number;
    venueId: number;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
    createdAt: string;
  }
  
  export interface Booking {
    id: number;
    userId: number;
    venueId: number;
    startTime: string;
    endTime: string;
    status: string;
    createdAt: string;
  }
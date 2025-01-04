import { IsOptional, IsDateString, IsString } from 'class-validator';

export class UpdateBookingDto {

  @IsOptional()
  @IsDateString()
  startTime?: string; // ISO 8601 date string

  @IsOptional()
  @IsDateString()
  endTime?: string; // ISO 8601 date string

  @IsOptional()
  @IsString()
  status?: string; // e.g., 'pending', 'confirmed', 'cancelled'

}



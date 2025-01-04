import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateBookingDto {

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  venueId: number;

  @IsNotEmpty()
  @IsDateString()
  startTime: string; // ISO 8601 date string

  @IsNotEmpty()
  @IsDateString()
  endTime: string; // ISO 8601 date string

}



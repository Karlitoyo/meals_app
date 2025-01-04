import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateAvailabilityDto {

  @IsNotEmpty()
  @IsDateString()
  startTime: string; // ISO 8601 date string

  @IsNotEmpty()
  @IsDateString()
  endTime: string; // ISO 8601 date string
}



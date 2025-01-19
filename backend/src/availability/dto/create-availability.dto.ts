import { IsNotEmpty, IsDateString, IsBoolean, IsOptional } from 'class-validator';

export class CreateAvailabilityDto {
  @IsNotEmpty()
  venueId: number;

  @IsNotEmpty()
  @IsDateString()
  startTime: string;

  @IsNotEmpty()
  @IsDateString()
  endTime: string;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}

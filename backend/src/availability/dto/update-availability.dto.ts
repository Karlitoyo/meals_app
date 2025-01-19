import { IsOptional, IsDateString, IsBoolean } from 'class-validator';

export class UpdateAvailabilityDto {
  @IsOptional()
  @IsDateString()
  startTime?: string;

  @IsOptional()
  @IsDateString()
  endTime?: string;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}

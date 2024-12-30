import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateVenueDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  state!: string;

  @IsString()
  @IsNotEmpty()
  zip!: string;

  @IsString()
  @IsNotEmpty()
  country!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsBoolean()
  isActive!: boolean;
}
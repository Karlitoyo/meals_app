import { IsEmail, IsString } from 'class-validator';

export class LoginVenueDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}
import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateVenueDto } from '../venues/dto/create-venue.dto';
import { LoginVenueDto } from '../venues/dto/login-venue.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Removed LocalAuthGuard from register
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.authService.register(createUserDto);
      return user;
    } catch (error) {
      throw new HttpException(
        'User registration failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (user) {
      const token = await this.authService.createToken(user); // Generate token
      console.log('Generated Token:', token); // Debugging
      return {
        message: 'Login successful',
        token, // Return the token
        user,
      };
    }
    throw new UnauthorizedException('Invalid credentials'); // Return error for invalid credentials
  }

  @Post('register-venue')
  async registerVenue(@Body() createVenueDto: CreateVenueDto) {
    try {
      const venue = await this.authService.registerVenue(createVenueDto);
      return venue;
    } catch (error) {
      throw new HttpException(
        'Venue registration failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login-venue')
  async loginVenue(@Body() loginDto: LoginVenueDto) {
    const venue = await this.authService.validateVenue(
      loginDto.email,
      loginDto.password,
    );
    if (venue) {
      const token = await this.authService.createToken(venue); // Generate token
      console.log('Generated Token:', token); // Debugging
      return {
        message: 'Login successful',
        token, // Return the token
        venue,
      };
    }
    throw new UnauthorizedException('Invalid credentials'); // Return error for invalid credentials
  }

  @UseGuards(JwtAuthGuard)
  async logout(@Request() req: ExpressRequest) {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from the Authorization header
    if (token) {
      await this.authService.logout(token);
      return { message: 'Logged out successfully' };
    }
    return { message: 'No token provided' };
  }
}

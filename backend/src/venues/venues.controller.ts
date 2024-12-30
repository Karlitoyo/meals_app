import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { VenuesService } from './venues.service';
import {CreateVenueDto} from './dto/create-venue.dto';
import {LoginVenueDto} from './dto/login-venue.dto';

@Controller('venues')
export class VenuesController {
  constructor(private readonly venueService: VenuesService) {}

@Post('register')
  async register(@Body() createVenueDto: CreateVenueDto) {
    try {
      const user = await this.venueService.registerVenue(createVenueDto);
      return user;
    } catch (error) {
      throw new HttpException('Venue registration failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Post('login')
  async login(@Body() loginVenueDto: LoginVenueDto) {
    try {
      const result = await this.venueService.login(loginVenueDto);
      return { message: 'Login successful', result };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return { message: 'Login failed', error: errorMessage };
    }
  }
}

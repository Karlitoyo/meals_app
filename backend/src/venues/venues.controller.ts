import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  Param,
} from '@nestjs/common';
import { VenuesService } from './venues.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { LoginVenueDto } from './dto/login-venue.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../services/get-user.decorator'; // Custom decorator to extract the user from the request
import { VenueResponseDto } from './dto/venue-response.dto';

@Controller('venues')
export class VenuesController {
  constructor(private readonly venueService: VenuesService) {}

  @Post('register')
  async register(@Body() createVenueDto: CreateVenueDto) {
    try {
      const venue = await this.venueService.registerVenue(createVenueDto);
      return venue;
    } catch (error) {
      throw new HttpException(
        'Venue registration failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post('login')
  async login(@Body() loginVenueDto: LoginVenueDto) {
    try {
      const result = await this.venueService.login(loginVenueDto);
      return { message: 'Login successful', result };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      return { message: 'Login failed', error: errorMessage };
    }
  }

  @UseGuards(JwtAuthGuard) // Use a guard if authentication is required
  @Get('all-venues')
  async getAllVenues(): Promise<VenueResponseDto[]> {
    try {
      const venues = await this.venueService.findAll();

      // Format the response to include only the necessary fields
      const formattedVenues = venues.map((venue) => ({
        id: venue.id,
        firstName: venue.firstName,
        lastName: venue.lastName,
        title: venue.title,
        description: venue.description,
        imageUrl: venue.imageUrl,
        capacity: venue.capacity,
        price: venue.price,
        isActive: venue.isActive,
        createdAt: venue.createdAt,
      }));

      return formattedVenues;
    } catch (error) {
      throw new Error('Error fetching venues');
    }
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard) // Protect the route with the JWT guard
  getProfile(@GetUser() venue) {
    // Extract the authenticated user from the request
    // Call a service to fetch the user by their ID from the database
    return this.venueService.findById(venue.id);
  }

  @Get(':id')
  async getVenueData(@Param('id') id: number) {
    return this.venueService.findById(id);
  }
}

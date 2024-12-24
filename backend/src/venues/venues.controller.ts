import { Controller, Get, Post, Body } from '@nestjs/common';
import { Venues } from './venue.entity';
import { VenuesService } from './venues.service';

@Controller('venues')
export class VenuesController {
  constructor(private readonly venueService: VenuesService) {}

  @Post()
  async createProvider(@Body() body: { specialty: string; availability: any }): Promise<Venues> {
    return this.venueService.createVenue(body.specialty, body.availability);
  }

  @Get()
  async getProviders(): Promise<Venues[]> {
    return this.venueService.getVenue();
  }
}

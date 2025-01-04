import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { AvailabilityService } from './availabilitys.service';
import { CreateAvailabilityDto } from '../availability/dto/create-availability.dto';

@Controller('venues/:venueId/availability')

export class AvailabilityController {

  constructor(private readonly availabilityService: AvailabilityService) {}

  @Get()
  findAll(@Param('venueId') venueId: number) {
    return this.availabilityService.findAll(venueId);
  }

  @Post()
  create(@Param('venueId') venueId: number, @Body() createAvailabilityDto: CreateAvailabilityDto) {
    return this.availabilityService.create(venueId, createAvailabilityDto);
  }
}


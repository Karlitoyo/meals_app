import { Injectable } from '@nestjs/common';

import { CreateAvailabilityDto } from './dto/create-availability.dto';

@Injectable()

export class AvailabilityService {

  findAll(venueId: number) {

    // Logic to find all availability slots for a venue

  }

  create(venueId: number, createAvailabilityDto: CreateAvailabilityDto) {

    // Logic to create an availability slot for a venue

  }

}


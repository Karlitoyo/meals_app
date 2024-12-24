import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venues } from './venue.entity';

@Injectable()
export class VenuesService {
  constructor(
    @InjectRepository(Venues)
    private venueRepository: Repository<Venues>,
  ) {}

  async createVenue(specialty: string, availability: any): Promise<Venues> {
    const venue = new Venues();
    venue.specialty = specialty;
    venue.availability = availability;
    return this.venueRepository.save(venue);
  }

  async getVenue(): Promise<Venues[]> {
    return this.venueRepository.find();
  }

    // Service methods to interact with the repository
    findAll(): Promise<Venues[]> {
      return this.venueRepository.find();
    }
}

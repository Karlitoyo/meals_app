import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { Availability } from '../availability/availability.entity';

@Injectable()
export class BookingsService {
    constructor(
        @InjectRepository(Booking)
        private bookingsRepository: Repository<Booking>,
        @InjectRepository(Availability)
        private availabilityRepository: Repository<Availability>,
      ) {}

      async create(createBookingDto: CreateBookingDto) {
        const { venueId, startTime, endTime } = createBookingDto;
        
        const startDate = new Date(startTime);
        const endDate = new Date(endTime);
      
        // Check if the venue is available for the given time
        const availability = await this.availabilityRepository.findOne({
          where: { venue: { id: venueId }, startTime: LessThanOrEqual(startDate), endTime: MoreThanOrEqual(endDate), isAvailable: true },
        });
      
        if (!availability) {
          throw new BadRequestException('Venue is not available at the selected time.');
        }
      
        const booking = this.bookingsRepository.create(createBookingDto);
        return this.bookingsRepository.save(booking);
      }

  findAll(userId?: number, venueId?: number) {

    // Logic to find all bookings, optionally filtered by userId or venueId
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {

    // Logic to update a booking

  }

  remove(id: number) {

    // Logic to remove a booking

  }

}



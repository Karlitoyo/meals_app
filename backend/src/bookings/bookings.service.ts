import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';

@Injectable()
export class BookingsService {
    constructor(
        @InjectRepository(Booking)
        private bookingsRepository: Repository<Booking>,
      ) {}

      async create(createBookingDto: CreateBookingDto): Promise<Booking> {
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



import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Booking } from './booking.entity';
import { AvailabilityService } from '../availability/availabilitys.service';
import { Availability } from '../availability/availability.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    private readonly availabilityService: AvailabilityService,
    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto) {
    const { venueId, startTime, endTime } = createBookingDto;
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    // Check if the venue is available for the given time
    const availability = await this.availabilityRepository.findOne({
      where: {
        venue: { id: venueId },
        startTime: LessThanOrEqual(startDate),
        endTime: MoreThanOrEqual(endDate),
        isAvailable: true,
      },
    });

    if (!availability) {
      throw new BadRequestException(
        'Venue is not available at the selected time.',
      );
    }
    
    // Ensure the booking time is within the availability slot
    if (startDate < availability.startTime || endDate > availability.endTime) {
      throw new BadRequestException(
        'Booking time is outside the available slot.',
      );
    }

    // Mark the availability as booked
    await this.availabilityService.markAsBooked(venueId, startDate, endDate);

    // Create the booking
    const booking = this.bookingsRepository.create(createBookingDto);
    return this.bookingsRepository.save(booking);
  }

  async findAll(userId?: number, venueId?: number): Promise<Booking[]> {
    const query = this.bookingsRepository.createQueryBuilder('booking');

    if (userId) {
      query.andWhere('booking.userId = :userId', { userId });
    }

    if (venueId) {
      query.andWhere('booking.venueId = :venueId', { venueId });
    }

    return query.getMany();
  }

  async update(
    id: number,
    updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    const booking = await this.bookingsRepository.findOne({ where: { id } });

    if (!booking) {
      throw new BadRequestException('Booking not found.');
    }

    Object.assign(booking, updateBookingDto);
    return this.bookingsRepository.save(booking);
  }

  async remove(id: number): Promise<void> {
    const booking = await this.bookingsRepository.findOne({ where: { id } });

    if (!booking) {
      throw new BadRequestException('Booking not found.');
    }

    await this.bookingsRepository.remove(booking);
  }
}

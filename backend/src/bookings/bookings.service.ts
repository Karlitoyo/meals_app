import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Booking } from './booking.entity';
import { AvailabilityService } from '../availability/availabilitys.service';
import { Availability } from '../availability/availability.entity';
import { Venues } from '../venues/venue.entity';
import { User } from '../users/user.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    private readonly availabilityService: AvailabilityService,
    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>,
    @InjectRepository(Venues)
    private venuesRepository: Repository<Venues>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto) {
    const { userId, venueId, startTime, endTime } = createBookingDto;
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const venue = await this.venuesRepository.findOne({ where: { id: venueId } });

    if (!user || !venue) {
      throw new BadRequestException('User or Venue not found');
    }

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

  async findAll(userId: number): Promise<Venues[]> {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }
  
    const bookings = await this.bookingsRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.venue', 'venue') 
      .leftJoinAndSelect('booking.user', 'user') // Ensure user is joined
      .where('user.id = :userId', { userId }) // Use user.id instead of booking.userId
      .select(['venue.id', 'venue.title', 'venue.address', 'venue.imageUrl'])
      .getMany();
  
    if (!bookings.length) {
      console.log('No bookings found for user:', userId);
    }
  
    return bookings.map((booking) => booking.venue);
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

import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { BookingsController } from './bookings.controller';
import { AvailabilityController } from 'src/availability/availabilitys.controller';
import { AvailabilityService } from 'src/availability/availabilitys.service';
import { Availability } from 'src/availability/availability.entity';
import { Venues } from 'src/venues/venue.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Booking, Availability, Venues])],
  controllers: [BookingsController, AvailabilityController],
  providers: [BookingsService, AvailabilityService],
  exports: [BookingsService],
})
export class BookingsModule {}
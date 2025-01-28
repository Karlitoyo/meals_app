import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venues } from './venue.entity';
import { VenuesService } from './venues.service';
import { VenuesController } from './venues.controller';
import { Availability } from 'src/availability/availability.entity';
import { AvailabilityService } from 'src/availability/availabilitys.service';
import { AvailabilityController } from 'src/availability/availabilitys.controller';
import { Booking } from 'src/bookings/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Venues, Availability, Booking])],
  providers: [VenuesService, AvailabilityService],
  controllers: [VenuesController, AvailabilityController],
  exports: [VenuesService],
})
export class VenuesModule {}

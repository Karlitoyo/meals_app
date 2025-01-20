import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { ConfigModule } from '@nestjs/config';
import { VenuesController } from './venues/venues.controller';
import { VenuesModule } from './venues/venues.module';
import { Venues } from './venues/venue.entity';
import { BookingsController } from './bookings/bookings.controller';
import { AvailabilityController } from './availability/availabilitys.controller';
import { BookingsModule } from './bookings/bookings.module';
import { AvailabilityModule } from './availability/availabilitys.module';
import { Availability } from './availability/availability.entity';
import { Booking } from './bookings/booking.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [User, Venues, Booking, Availability],
    synchronize: true,
  }),
  UsersModule,
  VenuesModule,
  AuthModule,
  BookingsModule,
  AvailabilityModule,
  ConfigModule.forRoot(),
],
  controllers: [AppController, UsersController, VenuesController, BookingsController, AvailabilityController],
  providers: [AppService],
})
export class AppModule {}

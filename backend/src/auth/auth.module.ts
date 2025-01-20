import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // Import UsersModule
import { VenuesModule } from 'src/venues/venues.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigModule } from '@nestjs/config';
import { BookingsModule } from 'src/bookings/bookings.module';
import { AvailabilityModule } from 'src/availability/availabilitys.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from '../bookings/booking.entity';
import { Availability } from '../availability/availability.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, Availability]),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule, // Ensure UsersModule is imported here
    VenuesModule,
    BookingsModule,
    AvailabilityModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY, // Replace with a real secret key
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
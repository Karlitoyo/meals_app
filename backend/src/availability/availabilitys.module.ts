import { Module } from '@nestjs/common';
import { AvailabilityService } from './availabilitys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Availability } from './availability.entity';
import { AvailabilityController } from './availabilitys.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Availability])],
  providers: [AvailabilityService],
  exports: [AvailabilityService],
  controllers: [AvailabilityController],
})
export class AvailabilityModule {}
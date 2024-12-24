import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venues } from './venue.entity';
import { VenuesService } from './venues.service';
import { VenuesController } from './venues.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Venues])],
  providers: [VenuesService],
  controllers: [VenuesController],
  exports: [VenuesService],
})
export class VenuesModule {}

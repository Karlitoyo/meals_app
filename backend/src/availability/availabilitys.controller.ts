import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { AvailabilityService } from './availabilitys.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() createAvailabilityDto: CreateAvailabilityDto) {
    return this.availabilityService.create(createAvailabilityDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query('venueId') venueId: number) {
    return this.availabilityService.findAll(venueId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/check')
  async isAvailable(
    @Query('venueId') venueId: number,
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ) {
    const isAvailable = await this.availabilityService.isVenueAvailable(venueId, new Date(startTime), new Date(endTime));
    return { isAvailable };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateAvailabilityDto: UpdateAvailabilityDto) {
    return this.availabilityService.update(id, updateAvailabilityDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.availabilityService.remove(id);
  }
}

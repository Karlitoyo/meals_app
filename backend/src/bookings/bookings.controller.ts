import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';

import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('createBooking')
  async create(@Body() createBookingDto: CreateBookingDto) {
    try {
      return await this.bookingsService.createBooking(createBookingDto);
    } catch (error) {
      // Handle error appropriately

      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query('userId', ParseIntPipe) userId: number) {
    try {
      return await this.bookingsService.findAll(userId);
    } catch (error) {
      // Handle error appropriately

      throw error;
    }
  }

  @UseGuards(JwtAuthGuard) // Consider adding guards here as well
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    try {
      return await this.bookingsService.update(id, updateBookingDto);
    } catch (error) {
      // Handle error appropriately

      throw error;
    }
  }

  @UseGuards(JwtAuthGuard) // Consider adding guards here as well
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.bookingsService.remove(id);
    } catch (error) {
      // Handle error appropriately

      throw error;
    }
  }
}

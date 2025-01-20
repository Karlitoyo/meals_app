import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Availability } from './availability.entity';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private readonly availabilityRepository: Repository<Availability>,
  ) {}

  async create(
    createAvailabilityDto: CreateAvailabilityDto,
  ): Promise<Availability> {
    const { venueId, startTime, endTime } = createAvailabilityDto;
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    // Check for overlapping availability
    const overlappingAvailability = await this.availabilityRepository.findOne({
      where: [
        {
          venue: { id: venueId },
          startTime: LessThanOrEqual(endDate),
          endTime: MoreThanOrEqual(startDate),
        },
      ],
    });

    if (overlappingAvailability) {
      throw new BadRequestException(
        'Overlapping availability already exists for this venue.',
      );
    }

    try {
      const availability = this.availabilityRepository.create(
        createAvailabilityDto,
      );
      console.log('Availability created:', availability);
      return this.availabilityRepository.save(availability);
    } catch (error) {
      console.error('Error creating availability:', error.message);
      throw error;
    }
  }

  async markAsBooked(
    venueId: number,
    startTime: Date,
    endTime: Date,
  ): Promise<void> {
    const availability = await this.availabilityRepository.findOne({
      where: {
        venue: { id: venueId },
        startTime: LessThanOrEqual(startTime),
        endTime: MoreThanOrEqual(endTime),
        isAvailable: true,
      },
    });

    if (!availability) {
      throw new BadRequestException(
        'No available slot found for the specified time range.',
      );
    }

    availability.isAvailable = false;
    await this.availabilityRepository.save(availability);
  }

    // Check if a venue is available for a specific time range
    async isVenueAvailable(venueId: number, startTime: Date, endTime: Date): Promise<boolean> {
      const availability = await this.availabilityRepository.findOne({
        where: {
          venue: { id: venueId },
          startTime: LessThanOrEqual(startTime),
          endTime: MoreThanOrEqual(endTime),
          isAvailable: true,
        },
      });
  
      return !!availability; // Returns true if available, false otherwise
    }

  async findAll(venueId: number): Promise<Availability[]> {
    return this.availabilityRepository.find({
      where: { venue: { id: venueId }, isAvailable: true },
    });
  }

  async update(
    id: number,
    updateAvailabilityDto: UpdateAvailabilityDto,
  ): Promise<Availability> {
    const availability = await this.availabilityRepository.findOne({
      where: { id },
    });

    if (!availability) {
      throw new BadRequestException('Availability record not found.');
    }

    Object.assign(availability, updateAvailabilityDto);
    return this.availabilityRepository.save(availability);
  }

  async remove(id: number): Promise<void> {
    const availability = await this.availabilityRepository.findOne({
      where: { id },
    });

    if (!availability) {
      throw new BadRequestException('Availability record not found.');
    }

    await this.availabilityRepository.remove(availability);
  }
}

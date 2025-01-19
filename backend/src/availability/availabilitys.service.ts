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

  // Create new availability for a venue
  async create(createAvailabilityDto: CreateAvailabilityDto): Promise<Availability> {
    const { venueId, startTime, endTime } = createAvailabilityDto;
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    // Check for overlapping availability
    const overlappingAvailability = await this.availabilityRepository.findOne({
      where: [
        { venue: { id: venueId }, startTime: LessThanOrEqual(endDate), endTime: MoreThanOrEqual(startDate) },
      ],
    });

    if (overlappingAvailability) {
      throw new BadRequestException('Overlapping availability already exists for this venue.');
    }

    const availability = this.availabilityRepository.create(createAvailabilityDto);
    return this.availabilityRepository.save(availability);
  }

  // Get all availability for a venue
  async findAll(venueId: number): Promise<Availability[]> {
    return this.availabilityRepository.find({
      where: { venue: { id: venueId }, isAvailable: true },
    });
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

  // Update availability record
  async update(id: number, updateAvailabilityDto: UpdateAvailabilityDto): Promise<Availability> {
    const availability = await this.availabilityRepository.findOne({ where: { id } });

    if (!availability) {
      throw new BadRequestException('Availability record not found.');
    }

    Object.assign(availability, updateAvailabilityDto);
    return this.availabilityRepository.save(availability);
  }

  // Delete availability
  async remove(id: number): Promise<void> {
    const availability = await this.availabilityRepository.findOne({ where: { id } });

    if (!availability) {
      throw new BadRequestException('Availability record not found.');
    }

    await this.availabilityRepository.remove(availability);
  }
}

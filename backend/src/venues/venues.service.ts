import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venues } from './venue.entity';
import * as bcrypt from 'bcrypt';
import { CreateVenueDto } from './dto/create-venue.dto';
import { LoginVenueDto } from './dto/login-venue.dto';

@Injectable()
export class VenuesService {
  constructor(
    @InjectRepository(Venues)
    private venueRepository: Repository<Venues>,
  ) {}

  // Compare plain text password with hashed password
  async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  // Register a new user with password hashing
  async registerVenue(createVenueDto: CreateVenueDto): Promise<Venues> {
    console.log('CreateVenueDto:', createVenueDto);
    const hashedPassword = await bcrypt.hash(createVenueDto.password, 10); // Hash the password
    const newVenue = this.venueRepository.create({
      ...createVenueDto,
      password: hashedPassword,
    });
    console.log('NewVenue:', newVenue);
    return this.venueRepository.save(newVenue); // Save the new user
  }

  async login(loginVenueDto: LoginVenueDto): Promise<Venues | null> {
    console.log('LoginVenueDto:', loginVenueDto);

    const user = await this.venueRepository.findOne({
      where: { email: loginVenueDto.email },
    });

    if (!user) {
      console.log('User not found');
      return null; // Return null if no user is found
    }

    const isPasswordValid = await bcrypt.compare(
      loginVenueDto.password,
      user.password as string,
    );
    if (!isPasswordValid) {
      console.log('Invalid password');
      return null; // Return null if password is invalid
    }

    console.log('Login successful');
    return user; // Return the user if both email and password are valid
  }

  async findById(id: number): Promise<Venues | undefined> {
    return await this.venueRepository.findOne({ where: { id } });
  }

  // Find user by email
  async findByEmail(email: string): Promise<Venues | undefined> {
    const user = await this.venueRepository.findOne({ where: { email } }); // Query user by email
    return user || undefined;
  }
  
  async findAll(): Promise<Venues[]> {
    return await this.venueRepository.find();
  }
}

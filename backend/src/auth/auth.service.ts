import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { VenuesService } from '../venues/venues.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { User } from '../users/user.entity'; // Replace with your actual User entity
import { CreateVenueDto } from '../venues/dto/create-venue.dto';
import { LoginVenueDto } from '../venues/dto/login-venue.dto';
import { Venues } from '../venues/venue.entity';

@Injectable()
export class AuthService {
  private readonly tokenBlacklist: Set<string> = new Set(); // This is where you would store your blacklisted tokens

  constructor(
    private usersService: UsersService,
    private venuesService: VenuesService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log('Validating user with email:', email);

    const user = await this.usersService.findByEmail(email); // Use TypeORM to find the user
    console.log('User found:', user);

    if (
      user &&
      user.password &&
      (await this.comparePassword(password, user.password))
    ) {
      console.log('Password match successful');
      const { password, ...result } = user;
      return result; // Return user data without password
    }

    console.log('Invalid credentials');
    return null; // Return null if validation fails
  }

  async validateVenue(email: string, password: string): Promise<any> {
    console.log('Validating venue with email:', email);

    const venue = await this.venuesService.findByEmail(email); // Use TypeORM to find the venue
    console.log('Venue found:', venue);

    if (
      venue &&
      venue.password &&
      (await this.comparePassword(password, venue.password))
    ) {
      console.log('Password match successful');
      const { password, ...result } = venue;
      return result; // Return venue data without password
    }

    console.log('Invalid credentials');
    return null; // Return null if validation fails
  }

  // Compare plain text password with hashed password
  async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async createToken(user: User) {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload); // Generate JWT token with user info
  }

  async login(loginUserDto: LoginUserDto): Promise<User | null> {
    console.log('LoginUserDto:', loginUserDto);

    const user = await this.usersService.findOne(loginUserDto.email);

    if (!user) {
      console.log('User not found');
      return null; // Return null if no user is found
    }

    if (!user.password) {
      console.log('User has no password');
      return null;
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      console.log('Invalid password');
      return null; // Return null if password is invalid
    }

    console.log('Login successful');
    return user; // Return the user if both email and password are valid
  }

  async register(createUserDto: CreateUserDto) {
    // Check if the user already exists
    const existingUser = await this.usersService.findOne(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;

    const user = await this.usersService.register(createUserDto);
    return user;
  }

  async loginVenue(loginVenueDto: LoginVenueDto): Promise<Venues | null> {
    const venue = await this.venuesService.findOne(loginVenueDto.email);

    if (!venue) {
      console.log('Venue not found');
      return null; // Return null if no venue is found
    }

    if (!venue.password) {
      console.log('Venue has no password');
      return null;
    }

    const isPasswordValid = await bcrypt.compare(
      loginVenueDto.password,
      venue.password,
    );
    if (!isPasswordValid) {
      console.log('Invalid password');
      return null; // Return null if password is invalid
    }

    console.log('Login successful');
    return venue; // Return the user if both email and password are valid
  }

  async registerVenue(createVenueDto: CreateVenueDto) {
    const existingVenue = await this.venuesService.findOne(createVenueDto.email);

    if (existingVenue) {
      throw new ConflictException('Venue already exists');
    }

    const hashedPassword = await bcrypt.hash(createVenueDto.password, 10);
    createVenueDto.password = hashedPassword;

    const venue = await this.venuesService.registerVenue(createVenueDto);
    return venue;
  }

  async logout(token: string): Promise<void> {
    this.tokenBlacklist.add(token);
    console.log(`Token ${token} has been blacklisted`); // Log the token that has been blacklisted
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    return this.tokenBlacklist.has(token);
  }
}

import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { User } from '../users/user.entity'; // Replace with your actual User entity

@Injectable()
export class AuthService {
  private readonly tokenBlacklist: Set<string> = new Set(); // This is where you would store your blacklisted tokens

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log('Validating user with email:', email);

    const user = await this.usersService.findByEmail(email); // Use TypeORM to find the user
    console.log('User found:', user);

    if (user && user.password && (await this.comparePassword(password, user.password))) {
      console.log('Password match successful');
      const { password, ...result } = user;
      return result; // Return user data without password
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

  async logout(token: string): Promise<void> {
    this.tokenBlacklist.add(token);
    console.log(`Token ${token} has been blacklisted`); // Log the token that has been blacklisted
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    return this.tokenBlacklist.has(token);
  }
}
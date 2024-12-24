import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Compare plain text password with hashed password
  async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  // Register a new user with password hashing
  async register(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10); // Hash the password
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userRepository.save(newUser); // Save the new user
  }

  async login(loginUserDto: LoginUserDto): Promise<User | null> {
    console.log('LoginUserDto:', loginUserDto);

    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
    });

    if (!user) {
      console.log('User not found');
      return null; // Return null if no user is found
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password as string,
    );
    if (!isPasswordValid) {
      console.log('Invalid password');
      return null; // Return null if password is invalid
    }

    console.log('Login successful');
    return user; // Return the user if both email and password are valid
  }

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user || undefined; // Convert null to undefined
  }

  // Find user by email
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } }); // Query user by email
    return user || undefined;
  }
}
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.register(createUserDto);
      return user;
    } catch (error) {
      throw new HttpException('User registration failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const result = await this.usersService.login(loginUserDto);
      return { message: 'Login successful', result };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return { message: 'Login failed', error: errorMessage };
    }
  }
}
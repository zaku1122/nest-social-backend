import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(@Body() dto: CreateUserDto) 
  {
    return this.usersService.register(dto);
  }


  @Post('login')
  async login(@Body() dto: LoginDto) 
  {
    return this.usersService.login(dto);
  }


  @Get()
  async findAll() 
  {
    return this.usersService.findAll();
  }


  @Get(':id')
  async findOne(@Param('id') id: string) 
  {
    return this.usersService.findOne(id);
  }


  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) 
  {
    return this.usersService.update(id, dto);
  }

  
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}

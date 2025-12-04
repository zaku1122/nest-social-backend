import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;


  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsEmail()
  email: any;

}

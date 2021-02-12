import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  name: string;

  @IsEmail()
  @IsOptional()
  @MaxLength(50)
  email?: string;
}

export class UpdateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  name?: string;

  @IsEmail()
  @IsOptional()
  @MaxLength(50)
  email?: string;
}

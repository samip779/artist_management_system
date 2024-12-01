import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  isEmail,
  IsEmail,
  IsEnum,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { Gender, Role, User } from 'src/models/user.model';

export class CreateUserDto implements User {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  @Transform(({ value }) => {
    if (!isEmail(value)) {
      return null;
    }

    return value.toLowerCase();
  })
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;

  @ApiProperty()
  @IsString()
  @Length(6, 10)
  phone: string;

  @ApiProperty()
  @IsDate({ message: 'dob must be a date string' })
  @Type(() => Date)
  dob: Date;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  role: Role;

  @ApiProperty()
  @IsString()
  address: string;
}

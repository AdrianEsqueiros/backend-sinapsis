import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The username of the user' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'The status of the user', required: false })
  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @ApiProperty({ description: 'The ID of the customer' })
  @IsInt()
  customerId: number;
}

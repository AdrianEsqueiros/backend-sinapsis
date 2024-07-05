import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ description: 'The name of the customer' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The status of the customer', required: false })
  @IsOptional()
  @IsBoolean()
  status?: boolean;

}

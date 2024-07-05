import { IsString, IsArray, ArrayNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {


  @ApiProperty({ description: 'The campaign ID' })
  @IsInt()
  campaign_id: number;

  @ApiProperty({ description: 'The message text to be sent' })
  @IsString()
  text: string;

  @ApiProperty({ description: 'The process date of the message' })
  @IsString()
  process_date: string;

  @ApiProperty({ description: 'The process hour of the message' })
  @IsString()
  process_hour: string;
}

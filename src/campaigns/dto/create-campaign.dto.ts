import { IsInt, IsString, IsDateString, IsArray, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCampaignDto {
  @ApiProperty({ description: 'The name of the campaign' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The process date of the campaign' })
  @IsDateString()
  process_date: string;

  @ApiProperty({ description: 'The process hour of the campaign' })
  @IsString()
  process_hour: string;

  @ApiProperty({ description: 'The process status of the campaign' })
  @IsInt()
  process_status: number;

  @ApiProperty({ description: 'The phone list for the campaign', type: [String] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  phone_list: string[];

  @ApiProperty({ description: 'The message text for the campaign' })
  @IsString()
  message_text: string;

  @ApiProperty({ description: 'The ID of the user associated with the campaign' })
  @IsInt()
  userId: number;
}

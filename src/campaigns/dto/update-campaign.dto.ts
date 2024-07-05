import { IsInt, IsString, IsDateString, IsArray, ArrayNotEmpty, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCampaignDto {
  @ApiPropertyOptional({ description: 'The name of the campaign' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'The process date of the campaign' })
  @IsOptional()
  @IsDateString()
  process_date?: string;

  @ApiPropertyOptional({ description: 'The process hour of the campaign' })
  @IsOptional()
  @IsString()
  process_hour?: string;

  @ApiPropertyOptional({ description: 'The process status of the campaign' })
  @IsOptional()
  @IsInt()
  process_status?: number;

  @ApiPropertyOptional({ description: 'The phone list for the campaign', type: [String] })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  phone_list?: string[];

  @ApiPropertyOptional({ description: 'The message text for the campaign' })
  @IsOptional()
  @IsString()
  message_text?: string;

  @ApiPropertyOptional({ description: 'The ID of the user associated with the campaign' })
  @IsOptional()
  @IsInt()
  userId?: number;
}

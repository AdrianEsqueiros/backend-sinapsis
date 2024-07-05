import { IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterCampaignsDto {
  @ApiProperty({ description: 'Start date for filtering campaigns' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ description: 'End date for filtering campaigns' })
  @IsDateString()
  endDate: string;
}

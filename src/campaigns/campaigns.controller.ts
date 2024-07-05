import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CampaignStatus } from './enums/campaign-status.enum';
import { FilterCampaignsDto } from './dto/filter-campaigns.dto';

@ApiTags('campaigns')
@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new campaign' })
  @ApiResponse({ status: 201, description: 'The campaign has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignsService.create(createCampaignDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all campaigns' })
  @ApiResponse({ status: 200, description: 'Return all campaigns.' })
  findAll() {
    return this.campaignsService.findAll();
  }
  @Get('filter')
  @ApiOperation({ summary: 'Get campaigns by date range' })
  @ApiResponse({ status: 200, description: 'Return campaigns within the date range.' })
  findByDateRange(@Query() filterCampaignsDto: FilterCampaignsDto) {
    return this.campaignsService.findByDateRange(filterCampaignsDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a campaign by ID' })
  @ApiResponse({ status: 200, description: 'Return the campaign by ID.' })
  @ApiResponse({ status: 404, description: 'Campaign not found.' })
  findOne(@Param('id') id: string) {
    return this.campaignsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a campaign by ID' })
  @ApiResponse({ status: 200, description: 'The campaign has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Campaign not found.' })
  update(@Param('id') id: string, @Body() updateCampaignDto: UpdateCampaignDto) {
    return this.campaignsService.update(+id, updateCampaignDto);
  }

  @Put(':id/status/:status')
  @ApiOperation({ summary: 'Update the status of a campaign' })
  @ApiResponse({ status: 200, description: 'The campaign status has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Campaign not found.' })
  updateStatus(@Param('id') id: string, @Param('status') status: CampaignStatus) {
    return this.campaignsService.updateStatus(+id, status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a campaign by ID' })
  @ApiResponse({ status: 200, description: 'The campaign has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Campaign not found.' })
  remove(@Param('id') id: string) {
    return this.campaignsService.remove(+id);
  }
}

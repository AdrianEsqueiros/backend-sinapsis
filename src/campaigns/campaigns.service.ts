import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Campaign } from './campaign.entity';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { User } from '../users/user.entity';
import { MessagesService } from 'src/messages/messages.service';
import { CampaignStatus } from './enums/campaign-status.enum';
import { MessageStatus } from 'src/messages/enums/message-status.enum';
import { FilterCampaignsDto } from './dto/filter-campaigns.dto';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly messagesService: MessagesService,
  ) {}

  findAll(): Promise<Campaign[]> {
    return this.campaignRepository.find({ relations: ['user', 'messages'] });
  }

  async findOne(id: number): Promise<Campaign> {
    const campaign = await this.campaignRepository.findOne({where: { id }, relations: ['user', 'messages']});
    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }
    return campaign;
  }

  async create(createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    const { userId, ...campaignData } = createCampaignDto;

    const user = await this.userRepository.findOne({where: { id: userId }});
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const campaign = this.campaignRepository.create({ ...campaignData, user });
    const savedCampaign = await this.campaignRepository.save(campaign);

    // Enviar mensajes para la campaña recién creada
    // await this.messagesService.sendMessagesForCampaign(savedCampaign.id);

    return savedCampaign;
  }

  async update(id: number, updateCampaignDto: UpdateCampaignDto): Promise<Campaign> {
    const { userId, ...campaignData } = updateCampaignDto;

    const campaign = await this.findOne(id);

    if (userId) {
      const user = await this.userRepository.findOne({where: { id: userId }});
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      campaign.user = user;
    }

    Object.assign(campaign, campaignData);
    return this.campaignRepository.save(campaign);
  }

  async updateStatus(id: number, status: CampaignStatus): Promise<Campaign> {
    const campaign = await this.findOne(id);
    campaign.process_status = status;
    return this.campaignRepository.save(campaign);
  }

  async findByDateRange(filterCampaignsDto: FilterCampaignsDto): Promise<Campaign[]> {
    const { startDate, endDate } = filterCampaignsDto;
    return this.campaignRepository.find({
      where: {
        process_date: Between(startDate, endDate),
      },
      relations: ['user', 'messages'],
    });
  }
  async remove(id: number): Promise<void> {
    const campaign = await this.findOne(id);
    await this.campaignRepository.remove(campaign);
  }
}

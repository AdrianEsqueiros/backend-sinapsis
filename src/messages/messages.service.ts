import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { Campaign } from 'src/campaigns/campaign.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageStatus } from './enums/message-status.enum';
import { CampaignStatus } from 'src/campaigns/enums/campaign-status.enum';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,

  ) {}
  
  async findAll(): Promise<Message[]> {
    return this.messageRepository.find({ relations: ['campaign'] });
  }

  async findMessagesByCampaign(campaignId: number): Promise<Message[]> {
    const campaign = await this.campaignRepository.findOne({where: { id: campaignId }});
    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${campaignId} not found`);
    }

    return this.messageRepository.find({ where: { campaignId:campaign.id }, relations: ['campaign'] });
  }

  async sendMessagesForCampaign({campaign_id, text, process_date, process_hour}: CreateMessageDto): Promise<Message[]> {
    const campaign = await this.campaignRepository.findOne({where: { id: campaign_id }});
    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${campaign_id} not found`);
    }

    const { phone_list, message_text, } = campaign;

    const messages = phone_list.map(phone => {
      return this.messageRepository.create({
        phone:phone.replace(/[{}"]/g, ''),
        text: text + message_text,
        shipping_status: MessageStatus.PENDING, // Pending status
        process_date,
        process_hour,
        campaign,
      });
    });
    const message = await this.messageRepository.save(messages);
    campaign.process_status = CampaignStatus.IN_PROCESS;
    await this.campaignRepository.save(campaign);    
    return message;
  }

  async updateMessageStatus(id: number, status: MessageStatus): Promise<Message> {
    const message = await this.messageRepository.findOne({where: { id }, relations: ['campaign']});
    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }

    message.shipping_status = status;
    await this.messageRepository.save(message);

    // Actualizar el estado de la campaña si todos los mensajes están en estado 2 o 3
    const campaign = message.campaign;
    const messages = await this.messageRepository.find({ where: { campaign }, select: ['shipping_status'] });

    if (messages.every(msg => msg.shipping_status === MessageStatus.SENT || msg.shipping_status === MessageStatus.ERROR)) {
      campaign.process_status = CampaignStatus.COMPLETED;
      await this.campaignRepository.save(campaign);
    }

    return message;
  }

}

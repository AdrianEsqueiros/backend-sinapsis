import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { CampaignsModule } from 'src/campaigns/campaigns.module';
import { Campaign } from 'src/campaigns/campaign.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message,Campaign]),],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports:[MessagesService]
})
export class MessagesModule {}

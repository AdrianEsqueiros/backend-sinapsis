import { Campaign } from 'src/campaigns/campaign.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MessageStatus } from './enums/message-status.enum';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  phone: string;

  @Column('text')
  text: string;

  @Column({
    type: 'enum',
    enum: MessageStatus,
    default: MessageStatus.PENDING,
  })
  shipping_status: MessageStatus;

  @Column('date')
  process_date: string;

  @Column('time')
  process_hour: string;
  
  @Column('integer')
  campaignId: number;
  
  @ManyToOne(() => Campaign, campaign => campaign.messages)
  @JoinColumn({ name: 'campaignId' })
  campaign: Campaign;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

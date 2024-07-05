import { Message } from 'src/messages/message.entity';
import { User } from 'src/users/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CampaignStatus } from './enums/campaign-status.enum';

@Entity('campaigns')
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('date')
  process_date: string;

  @Column('time')
  process_hour: string;

  @Column({
    type: 'enum',
    enum: CampaignStatus,
    default: CampaignStatus.PENDING,
  })
  process_status: CampaignStatus;

  @Column('text', { transformer: {
    to: (value: string[]) => value ? value.join(',') : '',
    from: (value: string) => value ? value.split(',') : [],
  }})
  phone_list: string[];

  @Column('text')
  message_text: string;
  
  @Column('integer')
  userId: number;

  @ManyToOne(() => User, user => user.campaigns)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Message, message => message.campaign)
  messages: Message[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

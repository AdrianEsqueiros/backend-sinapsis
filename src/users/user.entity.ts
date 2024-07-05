import { Customer } from 'src/customers/customer.entity';
import { Campaign } from 'src/campaigns/campaign.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  username: string;

  @Column('boolean', {
    default: true,
  })
  status: boolean;
  
  @Column('integer')
  customerId: number;

  @ManyToOne(() => Customer, customer => customer.users)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @OneToMany(() => Campaign, campaign => campaign.user)
  campaigns: Campaign[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

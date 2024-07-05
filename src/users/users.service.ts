import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Customer } from '../customers/customer.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['customer', 'campaigns'] });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['customer', 'campaigns'] });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { customerId, ...userData } = createUserDto;

    // Check if customer exists
    const customer = await this.customerRepository.findOne({where:{id:customerId}});
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${customerId} not found`);
    }

    // Create user
    const user = this.userRepository.create({ ...userData, customer });
    return this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { customerId, ...userData } = updateUserDto;

    // Check if user exists
    const user = await this.findOne(id);

    // Check if customer exists
    if (customerId) {
      const customer = await this.customerRepository.findOne({where:{id:customerId}});
      if (!customer) {
        throw new NotFoundException(`Customer with ID ${customerId} not found`);
      }
      user.customer = customer;
    }

    // Update user data
    Object.assign(user, userData);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}

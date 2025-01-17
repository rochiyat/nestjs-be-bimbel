import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { config } from '../../config';
import { User } from './entities/user.entity';
import { LoginDto } from '../auth/dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { password } = createUserDto;
      createUserDto.password = await bcrypt.hash(
        password,
        Number(config.password.salt),
      );
      const newUser = this.usersRepository.create(createUserDto);
      return this.usersRepository.save(newUser);
    } catch (error) {
      throw new Error('Error creating new user');
    }
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { user_id: id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update({ user_id: id }, updateUserDto);
    return this.usersRepository.findOne({ where: { user_id: id } });
  }

  async remove(id: number): Promise<void> {
    return this.usersRepository.delete(id).then();
  }

  async insertSampleData(): Promise<void> {
    const user1 = this.usersRepository.create({
      username: 'john_doe',
      email: 'john.doe@example.com',
      password: 'password123',
      full_name: 'John Doe',
      gender: 'Male',
      birth_date: new Date('1990-01-15'),
      address: '123 Main St, Anytown, USA',
      phone_number: '1234567890',
    });

    const user2 = this.usersRepository.create({
      username: 'jane_smith',
      email: 'jane.smith@example.com',
      password: 'securepassword',
      full_name: 'Jane Smith',
      gender: 'Female',
      birth_date: new Date('1985-05-25'),
      address: '456 Elm St, Othertown, USA',
      phone_number: '0987654321',
    });

    const user3 = this.usersRepository.create({
      username: 'alex_jones',
      email: 'alex.jones@example.com',
      password: 'mypassword',
      full_name: 'Alex Jones',
      gender: 'Non-binary',
      birth_date: new Date('1992-11-03'),
      address: '789 Oak St, Sometown, USA',
      phone_number: '1122334455',
    });
    const users = [user1, user2, user3].map((user) =>
      this.usersRepository.create(user),
    );
    await this.usersRepository.save(users).catch((error) => {
      console.error('Error inserting sample data:', error);
      throw error;
    });
  }

  async findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async signIn(loginDto: LoginDto): Promise<User> {
    const { username, password } = loginDto;
    const user = await this.findByUsername(username);
    if (!user) {
      throw new Error('User not found');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid password');
    }
    return user;
  }
}

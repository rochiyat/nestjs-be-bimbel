import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { config } from '../../../config';
import { IsDate, IsString } from "class-validator";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ length: 50, unique: true })
  @IsString()
  username: string;

  @Column({ length: 100, unique: true })
  @IsString()
  email: string;

  @Column({ length: 255, nullable: false })
  @IsString()
  password: string;

  @Column({ length: 255, nullable: true })
  @IsString()
  full_name: string;

  @Column({ length: 10, nullable: true })
  @IsString()
  gender: string;

  @Column('date', { nullable: true })
  @IsDate()
  birth_date: Date;

  @Column('text', { nullable: true })
  @IsString()
  address: string;

  @Column({ length: 15, nullable: true })
  @IsString()
  phone_number: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, config.password.salt);
    return hash === this.password;
  }
}

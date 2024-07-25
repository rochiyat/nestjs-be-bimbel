import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 255, nullable: false })
  password: string;

  @Column({ length: 255, nullable: true })
  full_name: string;

  @Column({ length: 10, nullable: true })
  gender: string;

  @Column('date', { nullable: true })
  birth_date: Date;

  @Column('text', { nullable: true })
  address: string;

  @Column({ length: 15, nullable: true })
  phone_number: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}

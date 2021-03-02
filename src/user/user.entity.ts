import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiProperty()
  @Column({ length: 30 })
  name: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true, length: 50 })
  email: string;

  @ApiProperty()
  @CreateDateColumn({ type: 'datetime' })
  created: Date;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 30 })
  name: string;

  @Column({ nullable: true, length: 50 })
  email: string;

  @CreateDateColumn({ type: 'datetime' })
  created: Date;
}

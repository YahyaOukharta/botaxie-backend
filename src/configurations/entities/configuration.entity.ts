import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Configuration {
  @PrimaryGeneratedColumn('uuid')
  configId: string;

  @Column()
  userId: string;

  @Column()
  name: string;

  @Column()
  json: string;
}

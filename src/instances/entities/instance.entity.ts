import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EncryptionTransformer } from 'typeorm-encrypted';

import * as dotenv from 'dotenv';
dotenv.config();

if (!process.env.ENCRYPTION_KEY)
  throw "ENCRYPTION KEY REQUIRED"

const MyEncryptionTransformerConfig = {
  key: process.env.ENCRYPTION_KEY as string,
  algorithm: 'aes-256-cbc',
  ivLength: 16
};


@Entity()
export class Instance {
  @PrimaryGeneratedColumn('uuid')
  instanceId: string;

  @Column()
  userId: string;

  @Column()
  configId: string;

  @Column({nullable:false})
  wallet: string;

  @Column()
  target: number;

  @Column()
  progress: number;

  @Column()
  status: number;

  @Column({
    type: "varchar",
    nullable: false,
    transformer: new EncryptionTransformer(MyEncryptionTransformerConfig),
    select:false,
  })
  pk: string;

  @Column()
  configJson: string;
}

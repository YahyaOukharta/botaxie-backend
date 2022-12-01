import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class InstanceLog {
    @PrimaryGeneratedColumn('uuid')
    instanceLogId : string;

    @Column()
    instanceId: string;

    @Column()
    userId: string;

    @Column()
    log : string;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP"})
    timestamp?: string;
}

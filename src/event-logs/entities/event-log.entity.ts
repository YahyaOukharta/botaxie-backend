import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type EventType = "INSTANCE_CREATED" | "INSTANCE_TERMINATED" | "PURCHASE_ATTEMPT"

export type InstanceCreatedData = {}
export type InstanceTerminatedData = {}
export type PurchaseAttemptData = {}

@Entity()
export class EventLog {
    @PrimaryGeneratedColumn("uuid")
    eventId : string;

    @Column()
    userId:string;

    @Column()
    eventType : EventType;

    @Column()
    json: string;
}

import { IsIn, IsJSON, IsUUID } from "class-validator";

export type EventType = "INSTANCE_CREATED" | "INSTANCE_TERMINATED" | "PURCHASE_ATTEMPT"
const eventTypes = ["INSTANCE_CREATED" , "INSTANCE_TERMINATED" , "PURCHASE_ATTEMPT"]
export class CreateEventLogDto {

    @IsUUID()
    userId:string;

    @IsIn(eventTypes)
    eventType:EventType;

    @IsJSON()
    json: string;
}

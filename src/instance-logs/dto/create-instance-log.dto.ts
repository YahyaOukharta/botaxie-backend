import { IsUUID } from "class-validator";

export class CreateInstanceLogDto {

    @IsUUID()
    instanceId: string;

    @IsUUID()
    userId: string;

    
    log : string;

}

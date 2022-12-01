import { IsUUID, Length, Max, Min } from 'class-validator';
export class CreateInstanceDto {
  @IsUUID()
  configId: string;

  @Min(1)
  target: number;

  progress: number;

  @Min(0)
  @Max(5)
  status: number;

  @Length(66, 66)
  pk: string;
}

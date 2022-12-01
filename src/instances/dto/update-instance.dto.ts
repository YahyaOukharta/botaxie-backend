import { Max, Min } from 'class-validator';

export class UpdateInstanceDto {
  progress: number;

  @Min(0)
  @Max(5)
  status: number;
}

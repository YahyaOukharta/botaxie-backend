import { Type } from 'class-transformer';
import {
  IsIn,
  isInstance,
  IsNotEmpty,
  IsOptional,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { classes } from 'src/data/classes';
import { parts } from 'src/data/parts';

type AxieClass =
  | 'beast'
  | 'aquatic'
  | 'plant'
  | 'bug'
  | 'bird'
  | 'reptile'
  | 'mech'
  | 'dawn'
  | 'dusk';
type AxiePartType = 'eyes' | 'ears' | 'back' | 'mouth' | 'horn' | 'tail';

class BodyPart {
  @IsNotEmpty()
  @IsIn(parts)
  partId: string;
  name?: string;

  @IsOptional()
  @IsIn(classes)
  class?: AxieClass;

  @IsOptional()
  @IsIn(['eyes', 'ears', 'back', 'mouth', 'horn', 'tail'])
  type?: AxiePartType;
}

class AxieStats {
  @IsOptional()
  @Min(0)
  hp?: number;

  @IsOptional()
  @Min(0)
  speed?: number;

  @IsOptional()
  @Min(0)
  skill?: number;

  @IsOptional()
  @Min(0)
  morale?: number;
}

class PotentialPoints {
  @IsOptional()
  @Min(0)
  beast?: number;

  @IsOptional()
  @Min(0)
  aquatic?: number;

  @IsOptional()
  @Min(0)
  plant?: number;

  @IsOptional()
  @Min(0)
  bug?: number;

  @IsOptional()
  @Min(0)
  bird?: number;

  @IsOptional()
  @Min(0)
  reptile?: number;

  @IsOptional()
  @Min(0)
  mech?: number;

  @IsOptional()
  @Min(0)
  dawn?: number;

  @IsOptional()
  @Min(0)
  dusk?: number;
}

export class CreateConfigurationDto {
  @IsNotEmpty()
  name: string;

  @Min(0.00001)
  @IsNotEmpty()
  maxPrice: number;

  minId?: number;
  maxId?: number;

  //Class
  @IsOptional()
  @IsIn(classes)
  class?: AxieClass;

  //Min Stats
  @IsOptional()
  @ValidateNested({ always: true })
  @Type(() => AxieStats)
  minStats: AxieStats;

  //Breed Count 0-7
  @IsOptional()
  @Min(0)
  @Max(7)
  minBreedCount?: number;

  @IsOptional()
  @Min(0)
  @Max(7)
  maxBreedCount?: number;

  // Purity 1-6
  @IsOptional()
  @Min(1)
  @Max(6)
  minPurity?: number;

  @IsOptional()
  @Min(1)
  @Max(6)
  maxPurity?: number;

  //Pureness 0-100 %
  @IsOptional()
  @Min(0)
  @Max(100)
  minPureness?: number;

  @IsOptional()
  @Min(0)
  @Max(100)
  maxPureness?: number;

  //Potential points
  @IsOptional()
  @ValidateNested({ always: true })
  @Type(() => PotentialPoints)
  minPotentialPoints: PotentialPoints;

  //genes
  @IsOptional()
  @ValidateNested({ always: true })
  @Type(() => BodyPart)
  eyesD?: BodyPart;

  @IsOptional()
  @ValidateNested({ always: true })
  @Type(() => BodyPart)
  earsD?: BodyPart;

  @IsOptional()
  @ValidateNested({ always: true })
  @Type(() => BodyPart)
  backD?: BodyPart;

  @IsOptional()
  @ValidateNested({ always: true })
  @Type(() => BodyPart)
  mouthD?: BodyPart;

  @IsOptional()
  @ValidateNested({ always: true })
  @Type(() => BodyPart)
  hornD?: BodyPart;

  @IsOptional()
  @ValidateNested({ always: true })
  @Type(() => BodyPart)
  tailD?: BodyPart;

  @IsOptional()
  @ValidateNested({ always: true })
  @Type(() => BodyPart)
  eyesR1?: BodyPart;

  @IsOptional()
  @ValidateNested({ always: true })
  @Type(() => BodyPart)
  earsR1?: BodyPart;

  @IsOptional()
  @ValidateNested({ always: true })
  @Type(() => BodyPart)
  backR1?: BodyPart;

  @IsOptional()
  @ValidateNested({ always: true })
  @Type(() => BodyPart)
  mouthR1?: BodyPart;

  @IsOptional()
  @ValidateNested({ always: true })
  @Type(() => BodyPart)
  hornR1?: BodyPart;

  @IsOptional()
  @ValidateNested({ always: true })
  @Type(() => BodyPart)
  tailR1?: BodyPart;

  @IsOptional()
  @ValidateNested({ always: true })
  @Type(() => BodyPart)
  eyesR2?: BodyPart;

  @IsOptional()
  @ValidateNested({ always: true })
  @Type(() => BodyPart)
  earsR2?: BodyPart;

  @IsOptional()
  @ValidateNested({ always: true })
  @Type(() => BodyPart)
  backR2?: BodyPart;

  @IsOptional()
  @ValidateNested({ always: true })
  @Type(() => BodyPart)
  mouthR2?: BodyPart;

  @IsOptional()
  @ValidateNested({ always: true })
  @Type(() => BodyPart)
  hornR2?: BodyPart;

  @IsOptional()
  @ValidateNested({ always: true })
  @Type(() => BodyPart)
  tailR2?: BodyPart;
}

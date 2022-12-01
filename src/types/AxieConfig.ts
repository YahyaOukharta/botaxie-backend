export type AxieClass =
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

interface BodyPart {
  partId: string;
  name?: string;
  class?: AxieClass;
  type?: AxiePartType;
}

interface AxieStats {
  hp?: number;
  speed?: number;
  skill?: number;
  morale?: number;
}
interface PotentialPoints {
  beast?: number;
  aquatic?: number;
  plant?: number;
  bug?: number;
  bird?: number;
  reptile?: number;
  mech?: number;
  dawn?: number;
  dusk?: number;
}
interface AxieConfig {
  maxPrice: number;

  minId?: number;
  maxId?: number;

  //Class
  class?: AxieClass;

  //Min Stats
  minStats: AxieStats;

  //Breed Count 0-7
  minBreedCount?: number;
  maxBreedCount?: number;

  // Purity 1-6
  minPurity?: number;
  maxPurity?: number;

  //Pureness 0-100 %
  minPureness?: number;
  maxPureness?: number;

  //Potential points
  minPotentialPoints: PotentialPoints;

  //genes
  eyesD?: BodyPart;
  earsD?: BodyPart;
  backD?: BodyPart;
  mouthD?: BodyPart;
  hornD?: BodyPart;
  tailD?: BodyPart;

  eyesR1?: BodyPart;
  earsR1?: BodyPart;
  backR1?: BodyPart;
  mouthR1?: BodyPart;
  hornR1?: BodyPart;
  tailR1?: BodyPart;

  eyesR2?: BodyPart;
  earsR2?: BodyPart;
  backR2?: BodyPart;
  mouthR2?: BodyPart;
  hornR2?: BodyPart;
  tailR2?: BodyPart;
}

export default AxieConfig;

interface Figure {
  atlas: string;
  model: string;
  image: string;
  __typename: string;
}

interface Ability {
  id: string;
  name: string;
  attack: number;
  defense: number;
  energy: number;
  description: string;
  backgroundUrl: string;
  effectIconUrl: string;
  __typename: string;
}

interface Part {
  id: string;
  name: string;
  class: string;
  type: string;
  specialGenes?: any;
  stage: number;
  abilities: Ability[];
  __typename: string;
}

interface Stats {
  hp: number;
  speed: number;
  skill: number;
  morale: number;
  __typename: string;
}

interface Asset {
  erc: string;
  address: string;
  id: string;
  quantity: string;
  orderId: number;
  __typename: string;
}

interface Order {
  id: number;
  maker: string;
  kind: string;
  assets: Asset[];
  expiredAt: number;
  paymentToken: string;
  startedAt: number;
  basePrice: string;
  endedAt: number;
  endedPrice: string;
  expectedState: string;
  nonce: number;
  marketFeePercentage: number;
  signature: string;
  hash: string;
  duration: number;
  timeLeft: number;
  currentPrice: string;
  suggestedPrice: string;
  currentPriceUsd: string;
  __typename: string;
}

interface OwnerProfile {
  name: string;
  __typename: string;
}

interface BattleInfo {
  banned: boolean;
  banUntil?: any;
  level: number;
  __typename: string;
}

interface Child {
  id: string;
  name: string;
  class: string;
  image: string;
  title: string;
  stage: number;
  __typename: string;
}

interface PotentialPoints {
  beast: number;
  aquatic: number;
  plant: number;
  bug: number;
  bird: number;
  reptile: number;
  mech: number;
  dawn: number;
  dusk: number;
  __typename: string;
}

export default interface Axie {
  id: string;
  image: string;
  class: string;
  chain: string;
  name: string;
  genes: string;
  newGenes: string;
  owner: string;
  birthDate: number;
  bodyShape: string;
  sireId: number;
  sireClass: string;
  matronId: number;
  matronClass: string;
  stage: number;
  title: string;
  breedCount: number;
  level: number;
  figure: Figure;
  parts: Part[];
  stats: Stats;
  order: Order;
  ownerProfile: OwnerProfile;
  battleInfo: BattleInfo;
  children: Child[];
  potentialPoints: PotentialPoints;
  __typename: string;
}

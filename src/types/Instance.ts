import AxieConfig from './AxieConfig';

export interface Instance {
  id: number;
  config: AxieConfig;
  privateKey: string;
  target: number;
}

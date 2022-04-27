import { Health } from './health.interface';

export interface Animal {
  name: string;
  age: number;
  breed: string;
  picture: string;
  health: Health;
}

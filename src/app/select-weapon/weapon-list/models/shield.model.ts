export enum ShieldLevel {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  THIRD = 'THIRD'
}

export class Shield {
  id: number;
  name: string;
  level: ShieldLevel;
  appearance: string;
  price: number;
}

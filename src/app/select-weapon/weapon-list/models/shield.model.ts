import {ArmoryItem} from "./armory-item.model";

export enum ShieldLevel {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  THIRD = 'THIRD'
}

export class Shield extends ArmoryItem {
  constructor(
    id: number,
    name: string,
    appearance: string,
    price: number,
    public level: ShieldLevel) {
    super(id, name, appearance, price);
  }
}

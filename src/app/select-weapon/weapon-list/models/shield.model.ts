import {ArmoryItem} from "./armory-item.model";

export enum ShieldLevel {
  FIRST = 1,
  SECOND = 2,
  THIRD = 3
}

export class Shield extends ArmoryItem {
  constructor(
    id: number,
    name: string,
    appearance: string,
    price: number,
    description: string,
    public level: ShieldLevel) {
    super(id, name, appearance, price, description);
  }
}

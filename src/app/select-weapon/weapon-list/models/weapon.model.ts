import {ArmoryItem} from "./armory-item.model";

export class Weapon extends ArmoryItem {
  constructor(
    id: number,
    name: string,
    appearance: string,
    price: number,
    description: string,
    public weight: number,
    public range: number,
    public strength: number,
    public spreadSpeed: number,
    public rollingRange?: number,
    public fluidAmount?: number,
    public detonationStartDistance?: number,
    public bounceNumber?: number,
    public bounceDistance?: number) {
    super(id, name, appearance, price, description);
  }
}

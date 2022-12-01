import {Weapon} from "../select-weapon/weapon-list/models/weapon.model";

export class UserWeapon {
  constructor(public item: Weapon, public quantity: number) {}
}

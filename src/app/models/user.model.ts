import {UserMode} from "./user-mode.model";
import {UserWeapon} from "./user-weapon.model";
import {UserShield} from "./user-shield.model";

export class User {
  constructor(public id: number,
              public name: string,
              public mode: UserMode,
              public money: number = 25000,
              public weapons: UserWeapon[] = [],
              public shields: UserShield[] = [],
              public aggressiveness: number = 50,
              public intellect: number = 50) {
  }
}

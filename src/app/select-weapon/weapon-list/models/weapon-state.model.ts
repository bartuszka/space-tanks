import {Weapon} from "./weapon.model";

export interface WeaponState {
  weaponList: Weapon[],
  weaponsOnPage: number,
  firstVisibleWeapon: number,
}

export const weaponStateInitialData: WeaponState = {
  weaponList: null,
  weaponsOnPage: 5,
  firstVisibleWeapon: 0,
}

import {Weapon} from "./weapon.model";
import {Shield} from "./shield.model";
import {ArmoryMode} from "./armory-mode.model";

export interface ArmoryState {
  weaponList: Weapon[],
  shieldList: Shield[],
  armoryMode: ArmoryMode,
}

export const armoryStateInitialData: ArmoryState = {
  weaponList: null,
  shieldList: null,
  armoryMode: ArmoryMode.WEAPON,
}

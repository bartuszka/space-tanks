import {Weapon} from "./weapon.model";
import {User} from "../../../models/user.model";

export interface SelectWeaponResolverData {
  weaponList: Weapon[];
  activeUsers: User[];
  activeUserId: number;
}

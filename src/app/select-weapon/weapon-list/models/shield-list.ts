import {Shield, ShieldLevel} from "./shield.model";

export const shieldList: Shield[] = [
  new Shield(11, 'Basic', '/assets/images/shield/basic.png', 100, ShieldLevel.FIRST),
  new Shield(12, 'Reflect Weak', '/assets/images/shield/reflect-first.png', 200, ShieldLevel.FIRST),
  new Shield(13, 'Reflect Medium', '/assets/images/shield/reflect-second.png', 1000, ShieldLevel.SECOND),
  new Shield(14, 'Reflect Strong', '/assets/images/shield/reflect-third.png', 3000, ShieldLevel.THIRD),
  new Shield(15, 'Magnetic Weak', '/assets/images/shield/magnetic-one.png', 800, ShieldLevel.FIRST),
  new Shield(16, 'Magnetic Medium', '/assets/images/shield/magnetic-second.png', 1500, ShieldLevel.SECOND),
  new Shield(17, 'Magnetic Strong', '/assets/images/shield/magnetic-third.png', 3000, ShieldLevel.THIRD),
  new Shield(18, 'Absorb Weak', '/assets/images/shield/absorb-one.png', 500, ShieldLevel.FIRST),
  new Shield(19, 'Absorb Medium', '/assets/images/shield/absorb-second.png', 1000, ShieldLevel.SECOND),
  new Shield(20, 'Absorb Strong', '/assets/images/shield/absorb-third.png', 1500, ShieldLevel.THIRD),
];

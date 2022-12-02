import {Shield, ShieldLevel} from "./shield.model";

export const shieldList: Shield[] = [
  new Shield(11, 'Basic', '/assets/images/shield/basic.png', 100,'Just a wall of bricks. Better than nothing.', ShieldLevel.FIRST),
  new Shield(12, 'Reflect Weak', '/assets/images/shield/reflect_1.png', 200,'Bounces not too heavy things. No gum. It\'s not Russia.', ShieldLevel.FIRST),
  new Shield(13, 'Reflect Medium', '/assets/images/shield/reflect_2.png', 1000,'Bounces rockets towards your opponent.', ShieldLevel.SECOND),
  new Shield(14, 'Reflect Strong', '/assets/images/shield/reflect_3.png', 3000,'Bounces everything, even stars', ShieldLevel.THIRD),
  new Shield(15, 'Magnetic Weak', '/assets/images/shield/magnetic_1.png', 800,'Magnetic field pushes light missiles away from you', ShieldLevel.FIRST),
  new Shield(16, 'Magnetic Medium', '/assets/images/shield/magnetic_2.png', 1500,'Strong magnetic field. Feel safe.', ShieldLevel.SECOND),
  new Shield(17, 'Magnetic Strong', '/assets/images/shield/magnetic_3.png', 3000,'Pushes away even plastic bags.', ShieldLevel.THIRD),
  new Shield(18, 'Absorb Weak', '/assets/images/shield/absorb_1.png', 500,'Bermuda triangle for missiles', ShieldLevel.FIRST),
  new Shield(19, 'Absorb Medium', '/assets/images/shield/absorb_2.png', 1000,'Small black whole', ShieldLevel.SECOND),
  new Shield(20, 'Absorb Strong', '/assets/images/shield/absorb_3.png', 1500,'Absorbs everything, even itself', ShieldLevel.THIRD),
];

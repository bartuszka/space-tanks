import {Weapon} from "./weapon.model";

export const weaponList: Weapon[] = [
  new Weapon(1, 'Single Shot', '/assets/images/weapon/single_shot.png', 50,
    30, 50, 10, 50),
  new Weapon(2,'Big Shot', '/assets/images/weapon/big_shot.png', 300,
    50, 70, 20, 70),
  new Weapon(3,'Three Shot', '/assets/images/weapon/triple_shot.png', 50,
    30, 50, 10, 50),
  new Weapon(4,'Five Shot', '/assets/images/weapon/triple_shot.png', 50,
    30, 50, 10, 50),
  new Weapon(5,'Blast', '/assets/images/weapon/blast.png', 3000,
    20, 50, 35, 50),
  new Weapon(6,'Mega Blast', '/assets/images/weapon/mega-blast.png', 7000,
    30, 80, 50, 50),
  new Weapon(7,'Mega Nuke', '/assets/images/weapon/mega-nuke.png', 30000,
    100, 100, 100, 100),
  new Weapon(8,'Nuke', '/assets/images/weapon/nuke.png', 18000,
    70, 30, 80, 100),
];

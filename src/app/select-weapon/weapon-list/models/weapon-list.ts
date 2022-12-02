import {Weapon} from "./weapon.model";

export const weaponList: Weapon[] = [
  new Weapon(1, 'Single Shot', '/assets/images/weapon/single_shot.png', 50,
    'Cheap weapon good for trial strikes', 30, 50, 10, 50),
  new Weapon(3,'Three Shot', '/assets/images/weapon/three_shot.png', 50,
    'Three weakest strikes are better then one', 30, 50, 10, 50),
  new Weapon(4,'Five Shot', '/assets/images/weapon/five_shot.png', 50,
    'Five weakest strikes make the job better than three', 30, 50, 10, 50),
  new Weapon(2,'Big Shot', '/assets/images/weapon/big_shot.png', 300,
    'Big shot for big boys', 50, 70, 20, 70),
  new Weapon(5,'Blast', '/assets/images/weapon/blast.png', 3000,
    'Strong blow of wind', 20, 50, 35, 50),
  new Weapon(6,'Mega Blast', '/assets/images/weapon/mega_blast.png', 7000,
    'Strong blow of wind', 30, 80, 50, 50),
  new Weapon(7, 'Mega nuke','/assets/images/weapon/mega_nuke.png', 30000,
    'Huge nuclear strike kills everything, but a miss will bankrupt you.',100,100, 100, 100),
  new Weapon(8,'Nuke', '/assets/images/weapon/nuke.png', 18000,
    'Powerful nuclear strike. Aim well as the range is small', 70, 30, 80, 100),
  new Weapon(9, 'Laser', '/assets/images/weapon/laser.png', 4000, 'Destroys everything it passes over',
    50, 5, 40, 80, 0, 0, 100, 0, 0),
  new Weapon(10,'Lava', '/assets/images/weapon/lava.png', 4000,
    'Even if you miss a bit, the fluid will reach and burn your opponent', 50, 5, 40, 80, 0, 50, 0, 0, 0),
];

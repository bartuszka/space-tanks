import {Shield, ShieldLevel} from "./shield.model";

export const shieldList: Shield[] = [
  {
    id: 1,
    name: 'Basic',
    appearance: '/assets/images/shield/basic.png',
    level: ShieldLevel.FIRST,
    price: 100,
  },
  {
    id: 1,
    name: 'Reflect Weak',
    appearance: '/assets/images/shield/reflect-first.png',
    level: ShieldLevel.FIRST,
    price: 200,
  },
  {
    id: 1,
    name: 'Reflect Medium',
    appearance: '/assets/images/shield/reflect-second.png',
    level: ShieldLevel.SECOND,
    price: 1000,
  },
  {
    id: 1,
    name: 'Reflect Strong',
    appearance: '/assets/images/shield/reflect-third.png',
    level: ShieldLevel.THIRD,
    price: 3000,
  },
  {
    id: 1,
    name: 'Magnetic Weak',
    appearance: '/assets/images/shield/magnetic-one.png',
    level: ShieldLevel.FIRST,
    price: 800,
  },
  {
    id: 1,
    name: 'Magnetic Medium',
    appearance: '/assets/images/shield/magnetic-second.png',
    level: ShieldLevel.SECOND,
    price: 1500,
  },
  {
    id: 1,
    name: 'Magnetic Strong',
    appearance: '/assets/images/shield/magnetic-third.png',
    level: ShieldLevel.THIRD,
    price: 3000,
  },
  {
    id: 1,
    name: 'Absorb Weak',
    appearance: '/assets/images/shield/absorb-one.png',
    level: ShieldLevel.FIRST,
    price: 500,
  },
  {
    id: 1,
    name: 'Absorb Medium',
    appearance: '/assets/images/shield/second-second.png',
    level: ShieldLevel.SECOND,
    price: 100,
  },
  {
    id: 1,
    name: 'Absorb Strong',
    appearance: '/assets/images/shield/second-second.png',
    level: ShieldLevel.THIRD,
    price: 1500,
  },
];

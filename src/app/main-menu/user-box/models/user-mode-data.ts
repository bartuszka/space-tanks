import {UserMode} from "../../../models/user-mode.model";
import {User} from "../../../models/user.model";

export interface UserModeData {
  userBoxButtonLabel: string,
  userBoxButtonSrc: string,
  initialModeName: string,
  initialData: User
}

export const userModeData: { [key: string]: UserModeData } = {
  [UserMode.HUMAN]: {
    userBoxButtonLabel: null,
    userBoxButtonSrc: './assets/images/icons/human.png',
    initialModeName: 'Player',
    initialData: {
      id: null,
      name: 'Player',
      mode: UserMode.HUMAN,
      money: 25000,
      weapons: [],
      shields: [],
      intellect: null,
      aggressiveness: null,
    }
  },
  [UserMode.COMPUTER]: {
    userBoxButtonLabel: null,
    userBoxButtonSrc: './assets/images/icons/microprocessor.png',
    initialModeName: 'Computer',
    initialData: {
      id: null,
      name: 'Player',
      mode: UserMode.COMPUTER,
      money: null,
      weapons: [],
      shields: [],
      intellect: 50,
      aggressiveness: 50,
    }
  },
  [UserMode.OFF]: {
    userBoxButtonLabel: 'Off',
    userBoxButtonSrc: null,
    initialModeName: null,
    initialData: {
      id: null,
      name: null,
      mode: UserMode.OFF,
      money: null,
      weapons: null,
      shields: null,
      intellect: null,
      aggressiveness: null,
    },
  },
};

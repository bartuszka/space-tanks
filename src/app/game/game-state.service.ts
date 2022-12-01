import {Injectable} from "@angular/core";
import {BehaviorSubject, map, Observable} from "rxjs";
import {GameState} from "../models/game-state";
import {User} from "../models/user.model";
import {Weapon} from "../select-weapon/weapon-list/models/weapon.model";
import {Shield} from "../select-weapon/weapon-list/models/shield.model";
import {UserArmory} from "../models/user-armory.model";
import {UserWeapon} from "../models/user-weapon.model";
import {ArmoryItem} from "../select-weapon/weapon-list/models/armory-item.model";
import {UserShield} from "../models/user-shield.model";

@Injectable()
export class GameStateService {
  public gameState$: Observable<GameState>;
  public activeUsers$: Observable<User[]>;

  private gameStateSubject$: BehaviorSubject<GameState>;

  constructor() {
    this.gameStateSubject$ = new BehaviorSubject<GameState>(null);
    this.gameState$ = this.gameStateSubject$.asObservable();
  }

  public setState(state: GameState): void {
    this.gameStateSubject$.next({ ...state });
  }

  public setUsers(users: User[]): void {
    const currentState: GameState = this.gameStateSubject$.getValue();
    this.gameStateSubject$.next({ ...currentState, users: [ ...users ] });
  }

  public setUser(user: User): void {
    const currentState: GameState = this.gameStateSubject$.getValue();
    const currentUsers: User[] = currentState.users;
    const updatedUserIndex: number = currentUsers.findIndex((currentUser: User) => currentUser.id === user.id);
    currentUsers[updatedUserIndex] = user;
    this.gameStateSubject$.next({ ...currentState, users: currentUsers });
  }

  public addArmory(user: User, armoryItem: ArmoryItem): void {
    const updatedUser: User = { ...user };
    const armoryArray: (UserWeapon | UserShield)[] = armoryItem instanceof Weapon ? user.weapons : user.shields;
    const existingUserArmoryIndex: number =
      armoryArray.findIndex((weapon: UserArmory) => weapon.item.id === armoryItem.id);

    existingUserArmoryIndex !== -1 ? armoryArray[existingUserArmoryIndex].quantity++ :
      armoryArray.push(this.createUserItem(armoryItem));
    this.setUser(updatedUser);
  }

  public subtractArmory(user: User, armoryItem: ArmoryItem): void {
    const updatedUser: User = { ...user };
    const armoryArray: (UserWeapon | UserShield)[] = armoryItem instanceof Weapon ? user.weapons : user.shields;
    const existingUserArmoryIndex: number =
      armoryArray.findIndex((weapon: UserArmory) => weapon.item.id === armoryItem.id);

    if (existingUserArmoryIndex !== -1 && armoryArray[existingUserArmoryIndex].quantity > 0) {
      armoryArray[existingUserArmoryIndex].quantity--;
    }
    this.setUser(updatedUser);
  }

  private createUserItem(armoryItem: ArmoryItem): UserWeapon | UserShield {
    return armoryItem instanceof Weapon ? new UserWeapon(armoryItem, 1) :
      new UserShield(armoryItem as Shield, 1);
  }
}

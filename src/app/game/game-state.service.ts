import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {GameState} from "../models/game-state";
import {User} from "../models/user.model";
import {UserWeapon} from "../models/user-weapon.model";

@Injectable()
export class GameStateService {
  public gameState$: Observable<GameState>;
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

  public addWeapon(user: User, weapon: UserWeapon): void {
    const updatedUser: User = { ...user };
    const existingWeaponIndex: number = updatedUser.weapons.findIndex((userWeapon: UserWeapon) =>
      userWeapon.item.id === weapon.item.id);
    const updatedMoney: number = user.money - weapon.item.price;

    if (updatedMoney < 0) {
      return;
    }

    if (existingWeaponIndex !== -1) {
      updatedUser.weapons[existingWeaponIndex].quantity ++;
    } else {
      updatedUser.weapons.push({ ...weapon, quantity: 1 });
    }

    updatedUser.money = updatedMoney;
    this.setUser(updatedUser);
  }

  public subtractWeapon(user: User, weapon: UserWeapon): void {
    const updatedUser: User = { ...user };
    const existingWeaponIndex: number = updatedUser.weapons.findIndex((userWeapon: UserWeapon) =>
      userWeapon.item.id === weapon.item.id);
    const updatedMoney: number = user.money + weapon.item.price;
    const updatedQuantity: number = updatedUser.weapons[existingWeaponIndex].quantity - 1;

    if (updatedQuantity < 0) {
      return;
    }

    if (existingWeaponIndex !== -1) {
      updatedUser.weapons[existingWeaponIndex].quantity = updatedQuantity;
    } else {
      return;
    }

    updatedUser.money = updatedMoney;
    this.setUser(updatedUser);
  }
}

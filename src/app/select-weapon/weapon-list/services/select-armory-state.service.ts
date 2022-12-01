import {Weapon} from "../models/weapon.model";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {ArmoryItem} from "../models/armory-item.model";
import {ArmoryMode} from "../models/armory-mode.model";
import {Shield} from "../models/shield.model";
import {ArmoryState, armoryStateInitialData} from "../models/armory-state.model";

@Injectable()
export class SelectArmoryStateService {
  public armoryState$: Observable<ArmoryState>;
  public armoryMode$: Observable<ArmoryMode>;
  public armoryItems$: Observable<ArmoryItem[]>;

  private armoryStateSubject$: BehaviorSubject<ArmoryState>;

  constructor() {
    this.armoryStateSubject$ = new BehaviorSubject<ArmoryState>(armoryStateInitialData);
    this.armoryState$ = this.armoryStateSubject$.asObservable();
  }

  public initializeState(weapons: Weapon[], shields: Shield[]): void {
    this.addWeapons(weapons);
    this.addShields(shields);
    this.setArmoryModeStream();
    this.setArmoryItemsStream();
  }

  public toggleArmoryMode(): void {
    const currentState = this.armoryStateSubject$.getValue();
    const updatedArmoryMode: ArmoryMode =
      currentState.armoryMode === ArmoryMode.WEAPON ? ArmoryMode.SHIELD : ArmoryMode.WEAPON;
    this.armoryStateSubject$.next({ ...currentState, armoryMode: updatedArmoryMode });
  }

  public getArmoryItemById(itemId: number): Weapon | Shield {
    const currentState: ArmoryState = this.armoryStateSubject$.getValue();
    const itemsArray: (Weapon | Shield)[] = currentState.armoryMode === ArmoryMode.WEAPON ?
      currentState.weaponList : currentState.shieldList;
    return itemsArray.find((item: Weapon | Shield) => item.id === itemId);
  }

  public setArmoryMode(armoryMode: ArmoryMode): void {
    this.armoryStateSubject$.next({ ...this.armoryStateSubject$.getValue(), armoryMode });
  }

  private addWeapons(weapons: Weapon[]): void {
    this.armoryStateSubject$.next({ ...this.armoryStateSubject$.getValue(), weaponList: [...weapons] });
  }

  private addShields(shields: Shield[]): void {
    this.armoryStateSubject$.next({ ...this.armoryStateSubject$.getValue(), shieldList: [...shields] });
  }

  private setArmoryModeStream(): void {
    this.armoryMode$ = this.armoryState$.pipe(
      map((armoryState: ArmoryState) => armoryState.armoryMode)
    );
  }

  private setArmoryItemsStream(): void {
    this.armoryItems$ = this.armoryState$.pipe(map((armoryState: ArmoryState) =>
      armoryState.armoryMode === ArmoryMode.WEAPON ? armoryState.weaponList : armoryState.shieldList));
  }
}

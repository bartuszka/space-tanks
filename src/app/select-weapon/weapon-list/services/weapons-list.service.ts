import {Weapon} from "../models/weapon.model";
import {WeaponState, weaponStateInitialData} from "../models/weapon-state.model";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class WeaponsListService {
  public weaponState$: Observable<WeaponState>;
  public visibleWeapons$: Observable<Weapon[]>;

  private weaponStateSubject$: BehaviorSubject<WeaponState>;

  constructor() {
    this.weaponStateSubject$ = new BehaviorSubject<WeaponState>(weaponStateInitialData);
    this.weaponState$ = this.weaponStateSubject$.asObservable();
    this.setVisibleWeaponsStream();
  }

  public initializeState(weapons: Weapon[]): void {
    this.addWeapons(weapons);
  }

  public getWeaponsLength(): number {
    return this.weaponStateSubject$.getValue().weaponList.length;
  }

  public moveFirstVisibleWeapon(itemsNumber: number): void {
    const state = { ...this.weaponStateSubject$.getValue() };

    if (state.firstVisibleWeapon + itemsNumber < 0 || state.firstVisibleWeapon + state.weaponsOnPage + itemsNumber > state.weaponList.length) {
      return;
    }
    this.weaponStateSubject$.next({ ...state, firstVisibleWeapon: state.firstVisibleWeapon + itemsNumber });
  }

  public setFirstVisibleWeapon(itemNumber: number): void {
    const state = {...this.weaponStateSubject$.getValue()};

    if (itemNumber >= 0 && itemNumber <= state.weaponList.length - state.weaponsOnPage) {
      this.weaponStateSubject$.next({ ...state, firstVisibleWeapon: itemNumber });
    }
  }

  private addWeapons(weapons: Weapon[]): void {
    this.weaponStateSubject$.next({ ...this.weaponStateSubject$.getValue(), weaponList: [...weapons] });
  }

  private setVisibleWeaponsStream(): void {
    this.visibleWeapons$ = this.weaponState$.pipe(
      map((weaponState: WeaponState) => {
        const firstWeaponIndex: number = weaponState.firstVisibleWeapon;
        const lastWeaponIndex: number = firstWeaponIndex + weaponState.weaponsOnPage;

        return weaponState.weaponList.slice(firstWeaponIndex, lastWeaponIndex);
      })
    );
  }
}

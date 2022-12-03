import {Injectable} from "@angular/core";
import {SelectArmoryStateService} from "./select-armory-state.service";
import {GameStateService} from "../../../game/game-state.service";
import {Params} from "@angular/router";
import {
  combineLatest,
  filter,
  map,
  Observable,
  pairwise,
  startWith,
  Subject,
  withLatestFrom
} from "rxjs";
import {User} from "../../../models/user.model";
import {GameState} from "../../../models/game-state";
import {UserMode} from "../../../models/user-mode.model";
import {ArmoryState} from "../models/armory-state.model";
import {ArmoryMode} from "../models/armory-mode.model";
import {ArmoryItem} from "../models/armory-item.model";
import {UserArmory} from "../../../models/user-armory.model";
import {ScrollingTableItem} from "../models/scrolling-table-item.model";
import {UserWeapon} from "../../../models/user-weapon.model";
import {UserShield} from "../../../models/user-shield.model";


@Injectable({
  providedIn: 'root'
})
export class ArmoryListService  {
  public params$: Observable<Params>;
  public activeUsers$: Observable<User[]>;
  public activeUser$: Observable<User>;
  public armoryMode$: Observable<ArmoryMode>;
  public armoryItems$: Observable<ArmoryItem[]>;
  public scrollingTableItems$: Observable<ScrollingTableItem[]>;
  public tableValueChanged$: Observable<ScrollingTableItem[]>;
  public resetTableSelect$: Observable<boolean>;
  public weaponPercentage$: Observable<number>;

  private paramsSubject$: Subject<Params>;
  private tableValueChangedSubject$: Subject<ScrollingTableItem[]>;

  constructor(private armoryStateService: SelectArmoryStateService,
              private gameStateService: GameStateService) {
    this.tableValueChangedSubject$ = new Subject<ScrollingTableItem[]>();
    this.tableValueChanged$ = this.tableValueChangedSubject$.asObservable();
    this.paramsSubject$ = new Subject<Params>();
    this.params$ = this.paramsSubject$.asObservable().pipe(startWith({ id: 1 }));
    this.setArmoryModeStream();
    this.setActiveUsersStream();
    this.setActiveUserStream();
    this.setArmoryItemsStream();
    this.setScrollingTableItemsStream();
    this.setResetTableSelectStream();
    this.setWeaponPercentageStream();
  }

  public setParams(params: Params): void {
    this.paramsSubject$.next(params);
  }

  public resetTableSelection(event: ScrollingTableItem[]): void {
    this.tableValueChangedSubject$.next(event);
  }

  private setActiveUserStream(): void {
    this.activeUser$ = combineLatest([this.params$, this.activeUsers$]).pipe(
      map(([params, activeUsers]: [Params, User[]]) =>
          activeUsers.find((user: User) => user.id === +params['id'])));
  }

  private setActiveUsersStream(): void {
    this.activeUsers$ = this.gameStateService.gameState$.pipe(
      map((gameState: GameState) => gameState.users.filter((user: User) => user.mode !== UserMode.OFF)));
  }

  private setArmoryModeStream(): void {
    this.armoryMode$ = this.armoryStateService.armoryState$.pipe(
      map((armoryState: ArmoryState) => armoryState.armoryMode));
  }

  private setArmoryItemsStream(): void {
    this.armoryItems$ = this.armoryStateService.armoryState$.pipe(
      map((armoryState: ArmoryState) =>
        armoryState.armoryMode === ArmoryMode.WEAPON ? armoryState.weaponList : armoryState.shieldList));
  }

  private setScrollingTableItemsStream(): void {
    this.scrollingTableItems$ = combineLatest([this.activeUser$, this.armoryItems$]).pipe(
      withLatestFrom(this.armoryMode$),
      map(([[currentUser, armoryItems], armoryMode]: [[User, ArmoryItem[]], ArmoryMode]) =>
        armoryItems.map((armoryItem: ArmoryItem) =>
          this.createTableDataItem(armoryItem, armoryMode === ArmoryMode.WEAPON ?
            currentUser.weapons : currentUser.shields)
        )
      ),
    );
  }

  private setResetTableSelectStream(): void {
    type CombinedType = { tableValueChanged: ScrollingTableItem[], armoryMode: ArmoryMode };

    this.resetTableSelect$ = this.tableValueChanged$.pipe(
      withLatestFrom(this.armoryMode$),
      map(([tableValueChanged, armoryMode]) => ({tableValueChanged, armoryMode})),
      pairwise(),
      filter(([oldCombined, newCombined]: CombinedType[]) => oldCombined.armoryMode !== newCombined.armoryMode),
      map(([oldCombined, newCombined]: CombinedType[]) => oldCombined.armoryMode !== newCombined.armoryMode)
    );
  }

  private createTableDataItem(visibleArmory: ArmoryItem, userArmory: UserArmory[]): ScrollingTableItem {
    const foundUserArmory: UserArmory = userArmory.find((currentUserArmory: UserArmory) =>
      currentUserArmory.item.id === visibleArmory.id);

    return {
      id: !!foundUserArmory ? foundUserArmory.item.id : visibleArmory.id,
      firstColumnContent: !!foundUserArmory ? foundUserArmory.item.name : visibleArmory.name,
      secondColumnContent: '$ ' + (!!foundUserArmory ? foundUserArmory.item.price : visibleArmory.price),
      thirdColumnContent: !!foundUserArmory ? foundUserArmory.quantity : 0
    }
  }

  private setWeaponPercentageStream(): void {
    this.weaponPercentage$ = this.activeUser$.pipe(
      map((user: User) => {
        const weaponExpenses: number = user.weapons
          .map((weapon: UserWeapon) => weapon.item.price * weapon.quantity)
          .reduce((accumulator: number, currentWeaponExpenses: number) => accumulator + currentWeaponExpenses);

        const shieldExpenses: number = user.shields
          .map((shield: UserShield) => shield.item.price * shield.quantity)
          .reduce((accumulator: number, currentShieldExpenses: number) => accumulator + currentShieldExpenses);

        const weaponPercentage: number = Math.ceil(weaponExpenses / (shieldExpenses + weaponExpenses) * 100);
        return isNaN(weaponPercentage) ? 50 : Math.floor(weaponExpenses / (shieldExpenses + weaponExpenses) * 100);
      })
    );
  }
}

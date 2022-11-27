import {Component, OnInit} from '@angular/core';
import {Weapon} from "./models/weapon.model";
import {combineLatest, map, Observable, take, takeUntil, tap} from "rxjs";
import {WeaponState} from "./models/weapon-state.model";
import {ActivatedRoute, Params} from "@angular/router";
import {Destroyable} from "../../components/destroyable.component";
import {GameState} from "../../models/game-state";
import {GameStateService} from "../../game/game-state.service";
import {UserWeapon} from "../../models/user-weapon.model";
import {User} from "../../models/user.model";
import {UserMode} from "../../models/user-mode.model";
import {SelectWeaponService} from "./services/select-weapon.service";
import {ScrollingPosition} from "./models/scrolling-position";

enum ScrollingDirection {
  UP = 'UP',
  DOWN = 'DOWN',
  NONE = 'NONE'
}

@Component({
  selector: 'app-weapon-list',
  templateUrl: './weapon-list.component.html',
  styleUrls: ['./weapon-list.component.scss']
})
export class WeaponListComponent extends Destroyable implements OnInit {
  public visibleWeapons$: Observable<Weapon[]>;
  public sliderCurrentStep$: Observable<number>;
  public weaponsWithQuantity$: Observable<UserWeapon[]>;
  public activeUser$: Observable<User>;
  public weaponsLength: number;
  public selectedWeapon: UserWeapon;

  private activeUsers$: Observable<User[]>;
  private scrollingPosition: ScrollingPosition = ScrollingPosition.MIDDLE;
  private scrollingBlocked: boolean = false;

  constructor(private gameStateService: GameStateService,
              private weaponListService: SelectWeaponService,
              private route: ActivatedRoute) {
    super();
  }

  public ngOnInit() {
    this.visibleWeapons$ = this.weaponListService.visibleWeapons$;
    this.setWeaponsLength();
    this.setStepStream();
    this.setActiveUsersStream();
    this.setActiveUserStream();
    this.setWeaponsWithQuantityStream();
    this.setSelectedWeapon();
  }

  public scrollDown(): void {
    if (!this.scrollingBlocked) {
      this.scrollingPosition = this.weaponListService.moveFirstVisibleWeapon(-1);
    }
    this.setSelectedWeapon(ScrollingDirection.UP);
  }

  public scrollUp(): void {
    if (!this.scrollingBlocked) {
      this.scrollingPosition = this.weaponListService.moveFirstVisibleWeapon(1);
    }
    this.setSelectedWeapon(ScrollingDirection.DOWN);
  }

  public scrollToItem(scrollingStep: number): void {
    this.weaponListService.setFirstVisibleWeapon(scrollingStep);
    this.scrollingPosition = ScrollingPosition.MIDDLE;
    this.setSelectedWeapon();
  }

  public addWeapon(user: User): void {
    this.gameStateService.addWeapon(user, this.selectedWeapon);
  }

  public subtractWeapon(user: User): void {
    this.gameStateService.subtractWeapon(user, this.selectedWeapon);
  }

  private setSelectedWeapon(scrollingDirection: ScrollingDirection = ScrollingDirection.NONE): void {
    this.weaponsWithQuantity$.pipe(
      takeUntil(this.$destroyed),
      take(1),
      tap((weaponsWithQuantity: UserWeapon[]) => {
        const middleWeapon: UserWeapon = weaponsWithQuantity[Math.floor(weaponsWithQuantity.length / 2)];
        this.selectedWeapon = this.scrollingPosition === ScrollingPosition.MIDDLE ? middleWeapon :
          this.getNextSelectedItem(weaponsWithQuantity, scrollingDirection);
        this.scrollingBlocked = this.scrollingPosition !== ScrollingPosition.MIDDLE || this.scrollingBlocked;
        this.scrollingBlocked = this.selectedWeapon?.item.id === middleWeapon.item.id ? false : this.scrollingBlocked;
      })
    ).subscribe();
  }

  private getNextSelectedItem(weaponsWithQuantity: UserWeapon[], scrollingDirection: ScrollingDirection): UserWeapon {
    const selectedWeaponIndex: number = weaponsWithQuantity.findIndex((weapon: UserWeapon) =>
      weapon.item.id === this.selectedWeapon.item.id);
    const isSelectedWeaponFirst: boolean = selectedWeaponIndex === 0 && scrollingDirection === ScrollingDirection.UP;
    const isSelectedWeaponLast: boolean = selectedWeaponIndex === weaponsWithQuantity.length - 1 &&
      scrollingDirection === ScrollingDirection.DOWN;

    return isSelectedWeaponFirst || isSelectedWeaponLast ? this.selectedWeapon :
      weaponsWithQuantity[selectedWeaponIndex - (scrollingDirection === ScrollingDirection.UP ? 1 : -1)]
  }

  private setStepStream(): void {
    this.sliderCurrentStep$ = this.weaponListService.weaponState$.pipe(
      map((state: WeaponState) => state.firstVisibleWeapon)
    );
  }

  private setWeaponsLength(): void {
    this.weaponListService.weaponState$.pipe(
      takeUntil(this.$destroyed),
      take(1),
      map((weaponState: WeaponState) => weaponState.weaponList.length))
      .subscribe((weaponsLength: number) => this.weaponsLength = weaponsLength);
  }

  private setActiveUserStream(): void {
    const currentUserId$: Observable<number> = this.route.params.pipe(
      takeUntil(this.$destroyed),
      map((params: Params) => +params['id']));

    this.activeUser$ = combineLatest([this.activeUsers$, currentUserId$]).pipe(
      map(([activeUsers, currentUserId]: [User[], number]) =>
        activeUsers.find((user: User) => user.id === currentUserId))
    );
  }

  private setActiveUsersStream(): void {
    this.activeUsers$ = this.gameStateService.gameState$.pipe(
      map((gameState: GameState) => gameState.users.filter((user: User) => user.mode !== UserMode.OFF))
    );
  }

  private setWeaponsWithQuantityStream(): void {
    this.weaponsWithQuantity$ =
      combineLatest([this.activeUser$, this.visibleWeapons$]).pipe(
        map(([currentUser, visibleWeapons]: [User, Weapon[]]) =>
          visibleWeapons.map((visibleWeapon: Weapon) => this.createUserWeapon(visibleWeapon, currentUser.weapons))
        ),
      );
  }

  private createUserWeapon(visibleWeapon: Weapon, userWeapons: UserWeapon[]): UserWeapon {
    const foundUserWeapon: UserWeapon = userWeapons.find((currentUserWeapon: UserWeapon) =>
      currentUserWeapon.item.id === visibleWeapon.id);
    return !!foundUserWeapon ? foundUserWeapon : { item: { ...visibleWeapon }, quantity: 0 };
  }
}

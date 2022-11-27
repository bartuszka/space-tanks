import {Component, OnInit} from '@angular/core';
import {WeaponsListService} from "./services/weapons-list.service";
import {Weapon} from "./models/weapon.model";
import {combineLatest, map, Observable, takeUntil} from "rxjs";
import {WeaponState} from "./models/weapon-state.model";
import {ActivatedRoute, Params} from "@angular/router";
import {Destroyable} from "../../components/destroyable.component";
import {GameState} from "../../models/game-state";
import {GameStateService} from "../../game/game-state.service";
import {UserWeapon} from "../../models/user-weapon.model";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-weapon-list',
  templateUrl: './weapon-list.component.html',
  styleUrls: ['./weapon-list.component.scss']
})
export class WeaponListComponent extends Destroyable implements OnInit {
  public visibleWeapons$: Observable<Weapon[]>;
  public sliderCurrentStep$: Observable<number>;
  public weaponsWithQuantity$: Observable<UserWeapon[]>;
  public weaponsLength: number;

  private currentUserId$: Observable<number>;
  private activeUsers$: Observable<User[]>;

  constructor(private gameStateService: GameStateService,
              private weaponListService: WeaponsListService,
              private route: ActivatedRoute) {
    super();
  }

  public ngOnInit() {
    this.visibleWeapons$ = this.weaponListService.visibleWeapons$;
    this.weaponsLength = this.weaponListService.getWeaponsLength();
    this.setParamsStream();
    this.setStepStream();
    this.setActiveUsersStream();
    this.setWeaponsWithQuantityStream();
  }

  public scrollDown(): void {
    this.weaponListService.moveFirstVisibleWeapon(-1);
  }

  public scrollUp(): void {
    this.weaponListService.moveFirstVisibleWeapon(1);
  }

  public scrollToItem(itemIndex: number): void {
    this.weaponListService.setFirstVisibleWeapon(itemIndex);
  }

  private setStepStream(): void {
    this.sliderCurrentStep$ = this.weaponListService.weaponState$.pipe(
      map((state: WeaponState) => state.firstVisibleWeapon)
    );
  }

  private setParamsStream(): void {
    this.currentUserId$ = this.route.params.pipe(
      takeUntil(this.$destroyed),
      map((params: Params) => +params['id']))
  }

  private setActiveUsersStream(): void {
    this.activeUsers$ = this.gameStateService.gameState$.pipe(
      map((gameState: GameState) => gameState.activeUsers)
    );
  }

  private setWeaponsWithQuantityStream(): void {
    this.weaponsWithQuantity$ =
      combineLatest([this.currentUserId$, this.activeUsers$, this.visibleWeapons$]).pipe(
        map(([currentUserId, activeUsers, visibleWeapons]: [number, User[], Weapon[]]) => {
          const foundUser: User = activeUsers.find((user: User) => user.id === currentUserId);
          return visibleWeapons.map((visibleWeapon: Weapon) => this.createUserWeapon(visibleWeapon, foundUser.weapons))
        })
      );
  }

  private createUserWeapon(visibleWeapon: Weapon, userWeapons: UserWeapon[]): UserWeapon {
    const foundUserWeapon: UserWeapon = userWeapons.find((currentUserWeapon: UserWeapon) =>
      currentUserWeapon.weapon.id === visibleWeapon.id);
    return !!foundUserWeapon ? foundUserWeapon : { weapon: { ...visibleWeapon }, quantity: 0 };
  }
}

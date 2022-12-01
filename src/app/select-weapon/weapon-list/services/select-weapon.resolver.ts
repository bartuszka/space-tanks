import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router} from "@angular/router";
import {combineLatest, map, Observable, of, take} from "rxjs";
import {weaponList} from "../models/weapon-list";
import {Injectable} from "@angular/core";
import {GameStateService} from "../../../game/game-state.service";
import {GameState} from "../../../models/game-state";
import {Weapon} from "../models/weapon.model";
import {User} from "../../../models/user.model";
import {UserMode} from "../../../models/user-mode.model";
import {shieldList} from "../models/shield-list";
import {Shield} from "../models/shield.model";
import {SelectArmoryStateService} from "./select-armory-state.service";

@Injectable()
export class SelectWeaponResolver implements Resolve<boolean>{
  constructor(private router: Router,
              private route: ActivatedRoute,
              private selectWeaponService: SelectArmoryStateService,
              private gameStateService: GameStateService) {}

  public resolve(routeSnapshot: ActivatedRouteSnapshot): Observable<boolean> {
    return combineLatest([of(weaponList), of(shieldList), this.gameStateService.gameState$]).pipe(
      take(1),
      map(([weaponList, shieldList, gameState]: [Weapon[], Shield[], GameState]) => {
        const activeUsers: User[] = gameState.users.filter((user: User) => user.mode !== UserMode.OFF);
        const currentActiveUser: number = activeUsers.find((user: User) => user.id === +routeSnapshot.params['id'])?.id;

        if (!weaponList.length || !activeUsers.length || !currentActiveUser) {
          this.router.navigate(['../space-tanks-main-menu'], { relativeTo: this.route });
        }

        this.selectWeaponService.initializeState(weaponList, shieldList);
        return weaponList.length && activeUsers.length && !!currentActiveUser;
      })
    );
  }
}

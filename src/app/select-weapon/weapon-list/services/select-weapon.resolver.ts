import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router} from "@angular/router";
import {combineLatest, map, Observable, of} from "rxjs";
import {weaponList} from "../models/weapon-list";
import {Injectable} from "@angular/core";
import {GameStateService} from "../../../game/game-state.service";
import {GameState} from "../../../models/game-state";
import {Weapon} from "../models/weapon.model";
import {User} from "../../../models/user.model";
import {UserMode} from "../../../models/user-mode.model";
import {SelectWeaponService} from "./select-weapon.service";

@Injectable()
export class SelectWeaponResolver implements Resolve<boolean>{
  constructor(private router: Router,
              private route: ActivatedRoute,
              private selectWeaponService: SelectWeaponService,
              private gameStateService: GameStateService) {}

  public resolve(routeSnapshot: ActivatedRouteSnapshot): Observable<boolean> {
    return combineLatest([of(weaponList), this.gameStateService.gameState$]).pipe(
      map(([weaponList, gameState]: [Weapon[], GameState]) => {
        const activeUsers: User[] = gameState.users.filter((user: User) => user.mode !== UserMode.OFF);
        const currentActiveUser: number = activeUsers.find((user: User) => user.id === +routeSnapshot.params['id'])?.id;

        if (!weaponList.length || !activeUsers.length || !currentActiveUser) {
          this.router.navigate(['../space-tanks-main-menu'], { relativeTo: this.route });
        }

        this.selectWeaponService.initializeState(weaponList);
        // this.selectWeaponService.setActiveUsers(activeUsers);
        this.selectWeaponService.setCurrentActiveUserId(currentActiveUser);

        return weaponList.length && activeUsers.length && !!currentActiveUser;
      })
    );
  }
}

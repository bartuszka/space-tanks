import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {combineLatest, map, Observable, of} from "rxjs";
import {weaponList} from "../models/weapon-list";
import {WeaponsListService} from "./weapons-list.service";
import {WeaponState} from "../models/weapon-state.model";
import {Injectable} from "@angular/core";
import {GameStateService} from "../../../game/game-state.service";
import {GameState} from "../../../models/game-state";
import {Weapon} from "../models/weapon.model";
import {User} from "../../../models/user.model";

@Injectable()
export class WeaponsListResolver implements Resolve<boolean>{
  constructor(private router: Router,
              private route: ActivatedRoute,
              private weaponListService: WeaponsListService,
              private gameStateService: GameStateService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    return combineLatest([of(weaponList), this.gameStateService.gameState$]).pipe(
      map(([weaponList, gameState]: [Weapon[], GameState]) => {
        this.weaponListService.initializeState(weaponList);
        const weaponListDataComplete: boolean = !!weaponList.length &&
          !!gameState.activeUsers.length &&
          !!gameState.activeUsers.find((activeUser: User) => activeUser.id === +route.params['id']);

        if (!weaponListDataComplete) {
          this.router.navigate(['../space-tanks-main-menu'], { relativeTo: this.route })
        }
        return weaponListDataComplete;
      })
    );
  }
}

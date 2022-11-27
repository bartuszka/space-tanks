import {Component, OnInit} from '@angular/core';
import {User} from "../models/user.model";
import {GameStateService} from "../game/game-state.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserMode} from "../models/user-mode.model";
import {filter, map, Observable, take} from "rxjs";
import {GameState} from "../models/game-state";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  public users$: Observable<User[]>;

  constructor(private gameStateService: GameStateService,
              private router: Router,
              private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.users$ = this.gameStateService.gameState$.pipe(
      map((gameState: GameState) => gameState.users)
    )
  }

  public updateUser(user: User): void {
    this.gameStateService.setUser(user);
  }

  public goToSelectWeapon(): void {
    this.gameStateService.gameState$
      .pipe(
        take(1),
        map((gameState: GameState) => gameState.users.find((user: User) => user.mode !== UserMode.OFF)?.id),
        filter(Boolean)
      )
      .subscribe((firstActiveUserIndex: number) => {
        this.router.navigate(['../select-weapon/user', firstActiveUserIndex], { relativeTo: this.route });
      })
  }
}

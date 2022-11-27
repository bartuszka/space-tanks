import {Component, OnInit} from '@angular/core';
import {GameStateService} from "../game/game-state.service";
import {map, Observable} from "rxjs";
import {User} from "../models/user.model";
import {GameState} from "../models/game-state";

@Component({
  selector: 'app-select-weapon',
  templateUrl: './select-weapon.component.html',
  styleUrls: ['./select-weapon.component.scss']
})
export class SelectWeaponComponent implements OnInit {
  public users$: Observable<User[]>;

  constructor(private gameStateService: GameStateService) {}

  public ngOnInit() {
    this.users$ = this.gameStateService.gameState$.pipe(
      map((gameState: GameState) => [ ...gameState.users ])
    )
  }
}

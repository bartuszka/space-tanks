import {Resolve} from "@angular/router";
import {GameState} from "../models/game-state";
import {Observable} from "rxjs";
import {User} from "../models/user.model";
import {UserMode} from "../models/user-mode.model";
import {GameStateService} from "./game-state.service";
import {Injectable} from "@angular/core";
import {weaponList} from "../select-weapon/weapon-list/models/weapon-list";

@Injectable()
export class GameStateResolver implements Resolve<GameState> {
  constructor(private gameStateService: GameStateService) {}

  resolve(): Observable<GameState> {
    const gameState: GameState = {
      gameId: (new Date()).getTime(),
      users: [
        new User(1, 'Player 1', UserMode.HUMAN, 25000, [{ weapon: weaponList[0], quantity: 5 }, { weapon: weaponList[1], quantity: 3 }], 0, 0),
        new User(2, 'Player 2', UserMode.COMPUTER, 0, [{ weapon: weaponList[2], quantity: 2 }], 70, 50),
        new User(3, 'Player 3', UserMode.OFF, 0, [], 0, 0),
        new User(4, null, UserMode.OFF, 0, [], 0, 0),
      ],
      activeUsers: []
    };

    this.gameStateService.setState(gameState);
    return this.gameStateService.gameState$;
  }
}

import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {GameState} from "../models/game-state";
import {User} from "../models/user.model";

@Injectable()
export class GameStateService {
  public gameState$: Observable<GameState>;
  private gameStateSubject$: BehaviorSubject<GameState>;

  constructor() {
    this.gameStateSubject$ = new BehaviorSubject<GameState>(null);
    this.gameState$ = this.gameStateSubject$.asObservable();
  }

  public setState(state: GameState): void {
    this.gameStateSubject$.next({ ...state });
  }

  public getUsers(): User[] {
    return [ ...this.gameStateSubject$.getValue().users ];
  }

  public setUsers(users: User[]): void {
    const currentState: GameState = this.gameStateSubject$.getValue();
    this.gameStateSubject$.next({ ...currentState, users: [ ...users ] });
  }

  public setUser(user: User): void {
    const currentState: GameState = this.gameStateSubject$.getValue();
    const currentUsers: User[] = currentState.users;
    const updatedUserIndex: number = currentUsers.findIndex((currentUser: User) => currentUser.id === user.id);
    currentUsers[updatedUserIndex] = user;
    this.gameStateSubject$.next({ ...currentState, users: currentUsers });
  }

  public setActiveUsers(activeUsers: User[]): void {
    console.log('activeUsers', activeUsers)
    this.gameStateSubject$.next({ ...this.gameStateSubject$.getValue(), activeUsers: [ ...activeUsers ] });
  }
}

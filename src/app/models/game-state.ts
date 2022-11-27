import {User} from "./user.model";

export interface GameState {
  gameId: number,
  users: User[],
}

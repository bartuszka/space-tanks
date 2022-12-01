import {Pipe, PipeTransform} from "@angular/core";
import {User} from "../../../models/user.model";
import {ChangeUserLabel} from "../models/change-user-label.model";

@Pipe({
  name: 'isLastUser'
})
export class IsLastUserPipe implements PipeTransform {
  transform(value: string, activeUsers: User[], activeUser: User): string {
    return this.getActiveUserIndex(activeUsers, activeUser) === activeUsers.length - 1 ?
      ChangeUserLabel.START_GAME : ChangeUserLabel.DONE;
  }

  public getActiveUserIndex(activeUsers: User[], activeUser: User): number {
    return activeUsers.findIndex((user: User) => user.id === activeUser.id);
  }
}

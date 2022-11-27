import {Component, OnInit} from '@angular/core';
import {User} from "../models/user.model";
import {GameStateService} from "../game/game-state.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserMode} from "../models/user-mode.model";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  public users: User[];

  constructor(private gameStateService: GameStateService,
              private router: Router,
              private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.users = this.gameStateService.getUsers();
  }

  public updateUser(user: User): void {
    this.gameStateService.setUser(user);
  }

  public goToSelectWeapon(): void {
    const activeUsers: User[] = this.users
      .filter((user: User) => user.mode !== UserMode.OFF);

    this.gameStateService.setActiveUsers(activeUsers);
    this.router.navigate(['../select-weapon/user', activeUsers[0].id], { relativeTo: this.route });
  }
}

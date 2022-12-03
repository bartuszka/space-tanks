import {Component, OnInit, ViewChild} from '@angular/core';
import {
  map,
  Observable,
  takeUntil,
} from "rxjs";
import {User} from "../models/user.model";
import {GameStateService} from "../game/game-state.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ArmoryItem} from "./weapon-list/models/armory-item.model";
import {ArmoryMode} from "./weapon-list/models/armory-mode.model";
import {ScrollingTableHeader, ScrollingTableItem} from "./weapon-list/models/scrolling-table-item.model";
import {IsLastUserPipe} from "./weapon-list/pipes/is-last-user.pipe";
import {ArmoryListComponent} from "./weapon-list/armory-list.component";
import {Destroyable} from "../components/destroyable.component";
import {SelectArmoryStateService} from "./weapon-list/services/select-armory-state.service";
import {ArmoryListService} from "./weapon-list/services/armory-list.service";
import {headerInitialData} from "./weapon-list/models/heaer-initial-data.model";
import {ArmoryBarChartData} from "./weapon-list/models/armory-bar-chart.model";
import {createUserChartData} from "./weapon-list/functions/create-user-chart-data";
import {ArmoryChartStyle} from "./weapon-list/models/armory-chart-style.model";

@Component({
  selector: 'app-select-armory',
  templateUrl: './select-armory.component.html',
  styleUrls: ['./select-armory.component.scss']
})
export class SelectArmoryComponent extends Destroyable implements OnInit {
  public activeUsers$: Observable<User[]>;
  public armoryMode$: Observable<ArmoryMode>;
  public scrollingTableItems$: Observable<ScrollingTableItem[]>;
  public armoryItems$: Observable<ArmoryItem[]>;
  public activeUser$: Observable<User>;
  public weaponPercentage$: Observable<number>;

  public scrollingTableHeader: ScrollingTableHeader;
  public armoryModes: typeof ArmoryMode = ArmoryMode;
  public selectedArmory: ArmoryItem;
  public userChartData: ArmoryBarChartData[] = createUserChartData();
  public userChartStyles: typeof ArmoryChartStyle = ArmoryChartStyle;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private gameStateService: GameStateService,
              private armoryStateService: SelectArmoryStateService,
              private isLastUserPipe: IsLastUserPipe,
              private armoryListService: ArmoryListService) {
    super();
  }

  public ngOnInit(): void {
    this.armoryMode$ = this.armoryListService.armoryMode$;
    this.activeUsers$ = this.armoryListService.activeUsers$;
    this.activeUser$ = this.armoryListService.activeUser$;
    this.armoryItems$ = this.armoryListService.armoryItems$;
    this.scrollingTableItems$ = this.armoryListService.scrollingTableItems$;
    this.scrollingTableHeader = headerInitialData;
    this.weaponPercentage$ = this.armoryListService.weaponPercentage$;
    this.setResetTableSelectStream();
    this.setRouteParamsStream();
  }

  @ViewChild(ArmoryListComponent, { static: false }) private armoryList: ArmoryListComponent;

  public resetTableSelection(event: ScrollingTableItem[]): void {
    this.armoryListService.resetTableSelection(event);
  }

  public toggleArmoryMode(): void {
    this.armoryStateService.toggleArmoryMode();
  }

  public addArmory(activeUser: User): void {
    this.gameStateService.addArmory(activeUser, this.armoryStateService.getArmoryItemById(this.selectedArmory.id));
  }

  public subtractArmory(activeUser: User): void {
    this.gameStateService.subtractArmory(activeUser, this.armoryStateService.getArmoryItemById(this.selectedArmory.id));
  }

  public setSelectedArmory(armoryId: number): void {
    if (this.selectedArmory?.id !== armoryId) {
      this.selectedArmory = this.armoryStateService.getArmoryItemById(armoryId);
    }
  }

  public goToNextUser(activeUsers: User[], activeUser: User): void {
    const activeUserIndex = this.isLastUserPipe.getActiveUserIndex(activeUsers, activeUser);
    activeUserIndex === activeUsers.length - 1 ?
      this.router.navigate(['../game'], { relativeTo: this.route }) :
      this.router.navigate(['../', activeUsers[activeUserIndex + 1].id], { relativeTo: this.route });
  }

  private setRouteParamsStream(): void {
    this.route.params
      .pipe(takeUntil(this.$destroyed))
      .subscribe((params: Params) => this.armoryListService.setParams(params))
  }

  private setResetTableSelectStream(): void {
    this.armoryListService.resetTableSelect$
      .pipe(takeUntil(this.$destroyed))
      .subscribe(() => this.armoryList?.resetSlider());
  }
}

import {Component, Input} from '@angular/core';
import {ArmoryItem} from "../weapon-list/models/armory-item.model";
import {ArmoryBarChartData} from "../weapon-list/models/armory-bar-chart.model";
import {BehaviorSubject, Observable} from "rxjs";
import {Weapon} from "../weapon-list/models/weapon.model";
import {createWeaponChartData} from "../weapon-list/functions/create-weapon-chart-data";
import {createShieldChartData} from "../weapon-list/functions/create-shield-chart-data";
import {CardColorMode} from "../weapon-list/models/card-color-mode.model";

@Component({
  selector: 'app-weapon-information',
  templateUrl: './weapon-information.component.html',
  styleUrls: ['./weapon-information.component.scss']
})
export class WeaponInformationComponent {
  @Input() public set armoryItem(armoryItem: ArmoryItem) {
    this._armoryItem = armoryItem;
    this.createBarChartData();
  };

  public barChartData$: Observable<ArmoryBarChartData[]>;
  public colorModes: typeof CardColorMode = CardColorMode;

  private barChartDataSubject$: BehaviorSubject<ArmoryBarChartData[]>;
  private _armoryItem: ArmoryItem;

  constructor() {
    this.barChartDataSubject$ = new BehaviorSubject<ArmoryBarChartData[]>(null);
    this.barChartData$ = this.barChartDataSubject$.asObservable();
  }

  public get armoryItem(): ArmoryItem {
    return this._armoryItem;
  }

  public getArmoryItemAsWeapon(): Weapon {
    return this.armoryItem as Weapon;
  }

  public isWeapon(): boolean {
    return this.armoryItem instanceof Weapon;
  }

  private createBarChartData(): void {
    this.armoryItem instanceof Weapon ? this.createWeaponChartData() : this.createShieldChartData();
  }

  private createWeaponChartData(): void {
    this.barChartDataSubject$.next(createWeaponChartData(this.armoryItem));
  }

  private createShieldChartData(): void {
    this.barChartDataSubject$.next(createShieldChartData(this.armoryItem));
  }
}

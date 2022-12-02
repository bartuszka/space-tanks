import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SelectWeaponCardComponent} from "./select-weapon-card/select-weapon-card.component";
import {SelectWeaponButtonComponent} from "./select-weapon-button/select-weapon-button.component";
import {CorneredContainerComponent} from "./cornered-container/cornered-container.component";
import {SelectWeaponSliderComponent} from "./select-weapon-slider/select-weapon-slider.component";
import {SelectWeaponSliderDirective} from "./select-weapon-slider/select-weapon-slider.directive";
import {ArmoryListComponent} from "./weapon-list/armory-list.component";
import {SelectArmoryRoutingModule} from "./select-armory-routing.module";
import {SelectArmoryComponent} from "./select-armory.component";
import {VisibleTableItemsPipe} from "./weapon-list/pipes/visible-table-items.pipe";
import {IsLastUserPipe} from "./weapon-list/pipes/is-last-user.pipe";
import {WeaponInformationComponent} from './weapon-information/weapon-information.component';
import {BarChartComponent} from './bar-chart/bar-chart.component';
import {BarChartLevelDirective} from "./bar-chart/bar-chart-level.directive";
import {WeaponInformationPiece} from "./weapon-information/wepon-information-piece/weapon-information-piece";

@NgModule({
  imports: [
    CommonModule,
    SelectArmoryRoutingModule,
  ],
  declarations: [
    SelectArmoryComponent,
    ArmoryListComponent,
    SelectWeaponCardComponent,
    SelectWeaponButtonComponent,
    CorneredContainerComponent,
    SelectWeaponSliderComponent,
    SelectWeaponSliderDirective,
    BarChartLevelDirective,
    VisibleTableItemsPipe,
    IsLastUserPipe,
    WeaponInformationComponent,
    BarChartComponent,
    WeaponInformationPiece,
  ],
  providers: [
    VisibleTableItemsPipe,
    IsLastUserPipe,
  ]
})
export class SelectArmoryModule {}

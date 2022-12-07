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
import {CircleChartComponent} from './circle-chart/circle-chart.component';
import {CircleChartDirective} from "./circle-chart/circle-chart-directive";
import {LinearChartComponent} from './linear-chart/linear-chart.component';
import {BitNumbersComponent} from './bit-numbers/bit-numbers.component';
import {BitPointColorDirective} from "./bit-numbers/bit-point-color.directive";
import {BitArrayFromNumberPipe} from "./bit-numbers/bit-array-from-number.pipe";
import { SquareBorderComponent } from './square-border/square-border.component';
import {ArrayFromNumberPipe} from "./square-border/array-from-number.pipe";
import {SquaresInColPipe} from "./square-border/squares-in-col.pipe";

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
    VisibleTableItemsPipe,
    IsLastUserPipe,
    BitArrayFromNumberPipe,
    ArrayFromNumberPipe,
    SquaresInColPipe,
    WeaponInformationComponent,
    BarChartComponent,
    WeaponInformationPiece,
    CircleChartComponent,
    SelectWeaponSliderDirective,
    BarChartLevelDirective,
    CircleChartDirective,
    BitPointColorDirective,
    LinearChartComponent,
    BitNumbersComponent,
    SquareBorderComponent,
  ],
  providers: [
    VisibleTableItemsPipe,
    IsLastUserPipe,
  ]
})
export class SelectArmoryModule {}

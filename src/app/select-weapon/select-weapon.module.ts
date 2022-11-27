import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SelectWeaponRoutingModule} from "./select-weapon-routing.module";
import {SelectWeaponComponent} from "./select-weapon.component";
import {WeaponListComponent} from "./weapon-list/weapon-list.component";
import {SelectWeaponCardComponent} from "./select-weapon-card/select-weapon-card.component";
import {SelectWeaponButtonComponent} from "./select-weapon-button/select-weapon-button.component";
import {CorneredContainerComponent} from "./cornered-container/cornered-container.component";
import {SelectWeaponSliderComponent} from "./select-weapon-slider/select-weapon-slider.component";
import {SelectWeaponSliderDirective} from "./select-weapon-slider/select-weapon-slider.directive";

@NgModule({
  imports: [
    CommonModule,
    SelectWeaponRoutingModule,
  ],
  declarations: [
    SelectWeaponComponent,
    WeaponListComponent,
    SelectWeaponCardComponent,
    SelectWeaponButtonComponent,
    CorneredContainerComponent,
    SelectWeaponSliderComponent,
    SelectWeaponSliderDirective,
  ]
})
export class SelectWeaponModule {}

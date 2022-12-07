import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MainMenuComponent} from "./main-menu.component";
import {UserBoxComponent} from "./user-box/user-box.component";
import {TrianglesButtonComponent} from "./triangles-button/triangles-button.component";
import {UserBoxButtonComponent} from "./user-box-button/user-box-button.component";
import {UserBoxInputComponent} from "./user-box-input/user-box-input.component";
import {UserBoxSliderComponent} from "./user-box-slider/user-box-slider.component";
import {InnerSliderComponent} from "./user-box-slider/inner-slider/inner-slider.component";
import {InnerSliderDirective} from "./user-box-slider/inner-slider/inner-slider.directive";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MainMenuRoutingModule} from "./main-menu-routing.module";
import {LaserButtonComponent} from "./laser-button/laser-button.component";
import {LaserStepperComponent} from "./laser-stepper/laser-stepper.component";
import {UserBoxFocusOutDirective} from "./user-box/user-box-focus-out.directive";
import {LaserStepperFocusedDirective} from "./laser-stepper/laser-stepper-focused.directive";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainMenuRoutingModule,
  ],
  declarations: [
    MainMenuComponent,
    UserBoxComponent,
    LaserButtonComponent,
    TrianglesButtonComponent,
    LaserStepperComponent,
    UserBoxButtonComponent,
    UserBoxInputComponent,
    UserBoxSliderComponent,
    InnerSliderComponent,
    InnerSliderDirective,
    UserBoxFocusOutDirective,
    LaserStepperFocusedDirective,
  ]
})
export class MainMenuModule {}

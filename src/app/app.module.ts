import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameStateService } from "./game/game-state.service";
import { GameStateResolver } from "./game/game-state.resolver";
import { CustomFormField } from "./models/custom-form-field";
import { Destroyable } from "./components/destroyable.component";
import { SelectWeaponResolver } from "./select-weapon/weapon-list/services/select-weapon.resolver";
import { SelectArmoryStateService } from "./select-weapon/weapon-list/services/select-armory-state.service";
import {ArmoryListService} from "./select-weapon/weapon-list/services/armory-list.service";

@NgModule({
  declarations: [
    AppComponent,
    CustomFormField,
    Destroyable,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    SelectArmoryStateService,
    ArmoryListService,
    SelectWeaponResolver,
    GameStateService,
    GameStateResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

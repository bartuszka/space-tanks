import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameStateService } from "./game/game-state.service";
import { GameStateResolver } from "./game/game-state.resolver";
import { CustomFormField } from "./models/custom-form-field";
import { Destroyable } from "./components/destroyable.component";
import { SelectWeaponService } from "./select-weapon/weapon-list/services/select-weapon.service";
import { SelectWeaponResolver } from "./select-weapon/weapon-list/services/select-weapon.resolver";

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
    SelectWeaponService,
    SelectWeaponResolver,
    GameStateService,
    GameStateResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

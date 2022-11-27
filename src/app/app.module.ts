import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeaponsListService } from "./select-weapon/weapon-list/services/weapons-list.service";
import { WeaponsListResolver } from "./select-weapon/weapon-list/services/weapons-list.resolver";
import { GameStateService } from "./game/game-state.service";
import { GameStateResolver } from "./game/game-state.resolver";
import { CustomFormField } from "./models/custom-form-field";
import { Destroyable } from "./components/destroyable.component";

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
    WeaponsListService,
    WeaponsListResolver,
    GameStateService,
    GameStateResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

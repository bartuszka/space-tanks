import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {GameRoutingModule} from "./game-routing.module";
import {GameComponent} from "./game.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GameRoutingModule,
  ],
  declarations: [
    GameComponent
  ]
})
export class GameModule {}

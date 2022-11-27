import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {GameRoutingModule} from "./game-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GameRoutingModule,
  ],
})
export class GameModule {}

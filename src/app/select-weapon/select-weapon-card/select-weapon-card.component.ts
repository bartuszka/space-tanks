import {Component, Input} from '@angular/core';
import {CardColorMode} from "../weapon-list/models/card-color-mode.model";

@Component({
  selector: 'app-select-weapon-card',
  templateUrl: './select-weapon-card.component.html',
  styleUrls: ['./select-weapon-card.component.scss']
})
export class SelectWeaponCardComponent {
  @Input() public colorMode: CardColorMode = CardColorMode.BLUE;
  public colorModes: typeof CardColorMode = CardColorMode;
}

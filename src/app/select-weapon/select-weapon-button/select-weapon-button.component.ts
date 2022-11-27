import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-select-weapon-button',
  templateUrl: './select-weapon-button.component.html',
  styleUrls: ['./select-weapon-button.component.scss']
})
export class SelectWeaponButtonComponent {
  @Input() label: string = null;
}

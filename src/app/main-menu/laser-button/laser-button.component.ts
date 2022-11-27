import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-laser-button',
  templateUrl: './laser-button.component.html',
  styleUrls: ['./laser-button.component.scss']
})
export class LaserButtonComponent {
  @Input() public label: string = 'Label';
}

import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-square-border',
  templateUrl: './square-border.component.html',
  styleUrls: ['./square-border.component.scss']
})
export class SquareBorderComponent {
  @Input() public repeatX: number;
  @Input() public repeatY: number;
  @Input() public hideBigSquares: boolean = false;
}

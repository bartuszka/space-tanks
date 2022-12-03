import {Component, Input} from '@angular/core';
import {Corner} from "./models/corner";

@Component({
  selector: 'app-cornered-container',
  templateUrl: './cornered-container.component.html',
  styleUrls: ['./cornered-container.component.scss']
})
export class CorneredContainerComponent {
  @Input() public dottedBorder: boolean = true;
  public corners: typeof Corner = Corner;
  public cornersArray: Corner[] = Object.values(Corner);
}

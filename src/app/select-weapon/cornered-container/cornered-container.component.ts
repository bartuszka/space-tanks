import { Component } from '@angular/core';
import {Corner} from "./models/corner";

@Component({
  selector: 'app-cornered-container',
  templateUrl: './cornered-container.component.html',
  styleUrls: ['./cornered-container.component.scss']
})
export class CorneredContainerComponent {
  public corners: typeof Corner = Corner;
  public cornersArray: Corner[] = Object.values(Corner);
}

import {Component, Input} from '@angular/core';
import {ArmoryBarChartData} from "../weapon-list/models/armory-bar-chart.model";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {
  @Input() public barChartData: ArmoryBarChartData[];
}

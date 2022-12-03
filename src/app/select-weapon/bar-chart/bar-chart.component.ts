import {Component, Input} from '@angular/core';
import {ArmoryBarChartData} from "../weapon-list/models/armory-bar-chart.model";
import {ArmoryChartStyle} from "../weapon-list/models/armory-chart-style.model";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {
  @Input() public barChartData: ArmoryBarChartData[];
  @Input() public barChartStyle: ArmoryChartStyle;

  public barChartStyles: typeof ArmoryChartStyle = ArmoryChartStyle;
}

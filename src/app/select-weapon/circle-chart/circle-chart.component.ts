import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-circle-chart',
  templateUrl: './circle-chart.component.html',
  styleUrls: ['./circle-chart.component.scss']
})
export class CircleChartComponent {
  @Input() public percentageValue: number = 0;
  @Input() public label: string;
}

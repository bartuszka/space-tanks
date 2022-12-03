import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {CanvasLinearChartEffect} from "./canvas-linear-chart-effect";

@Component({
  selector: 'app-linear-chart',
  templateUrl: './linear-chart.component.html',
  styleUrls: ['./linear-chart.component.scss']
})
export class LinearChartComponent implements OnInit {

  @ViewChild('linearChartCanvas', { static: true }) linearChartCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('linearChartCanvasContainer', { static: true }) linearChartCanvasContainer: ElementRef<HTMLElement>;

  private linearChartEffect: CanvasLinearChartEffect;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.linearChartEffect = new CanvasLinearChartEffect(
      this.renderer,
      this.linearChartCanvas.nativeElement,
      this.linearChartCanvasContainer.nativeElement);

    this.linearChartEffect.initializeEffects();
  }
}

import {Directive, ElementRef, Input, OnInit, Renderer2} from "@angular/core";

@Directive({
  selector: '[appBarCHartLevel]'
})
export class BarChartLevelDirective implements OnInit {
  @Input() public barValue: number;
  @Input() public barMaxValue: number;

  private parentWidth: number;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  public ngOnInit() {
    this.parentWidth = parseInt(getComputedStyle(this.elRef.nativeElement.parentNode).width);
    const barWidth: number = this.parentWidth / this.barMaxValue * this.barValue;
    this.renderer.setStyle(this.elRef.nativeElement, 'width', barWidth + 'px');
  }
}

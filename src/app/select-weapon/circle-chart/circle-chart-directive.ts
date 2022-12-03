import {Directive, ElementRef, Input, Renderer2} from "@angular/core";

@Directive({
  selector: '[appCircleChart]'
})
export class CircleChartDirective {
  @Input() public circleLength: number = 0;
  @Input() public set percentageValue(percentageValue: number) {
    if (!!this.elRef) {
      const percentageCircleLength: number = this.circleLength - this.circleLength / 100 * percentageValue;
      this.renderer.setStyle(this.elRef.nativeElement, 'stroke-dashoffset', percentageCircleLength);
    }
  }

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
}

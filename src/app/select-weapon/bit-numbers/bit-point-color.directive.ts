import {Directive, ElementRef, Input, Renderer2} from "@angular/core";

enum PointColor {
  POINT_WHITE = 'rgba(255,255,255,1)',
  POINT_BLUE = 'rgba(200, 200, 255, .5)',
  POINT_VIOLET = 'rgba(255, 210, 255, .7)',
  POINT_TRANSPARENT = 'transparent'
}

@Directive({
  selector: '[bitPointColor]'
})
export class BitPointColorDirective {
  @Input() set colorNumber(colorNumber: number) {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', this.getColorByNumber(colorNumber));
  };

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    this.colorNumber = null;
  }

  private getColorByNumber(colorNumber: number): string {
    switch (colorNumber) {
      case 1:
        return PointColor.POINT_TRANSPARENT;
      case 2:
        return PointColor.POINT_WHITE;
      case 3:
        return PointColor.POINT_BLUE;
      case 4:
        return PointColor.POINT_VIOLET;
      default:
        return Object.values(PointColor)[Math.floor(Math.random() * 3)];
    }
  }
}

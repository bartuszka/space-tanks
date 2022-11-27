import {AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {TrianglesEffect} from "../effects/triangles-effect";

@Component({
  selector: 'app-triangles-button',
  templateUrl: './triangles-button.component.html',
  styleUrls: ['./triangles-button.component.scss']
})
export class TrianglesButtonComponent implements AfterViewInit {
  @Input() public label: string = 'Label';
  @ViewChild('triangleButtonCanvas', { static: false }) private triangleButtonCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('triangleButton', { static: false }) private triangleButton: ElementRef<HTMLButtonElement>;

  private trianglesEffect: TrianglesEffect;
  private canvas: HTMLCanvasElement;
  private button: HTMLButtonElement;

  constructor(private renderer: Renderer2) {}

  public ngAfterViewInit(): void {
    this.canvas = this.triangleButtonCanvas.nativeElement;
    this.button = this.triangleButton.nativeElement;

    this.trianglesEffect = new TrianglesEffect(
      this.renderer,
      this.triangleButtonCanvas.nativeElement,
      this.triangleButton.nativeElement,
      Math.floor(this.triangleButton.nativeElement.offsetHeight / 0.9),
      2,
      8,
      [128, 0, 0, 1]
    );
    this.trianglesEffect.initializeCanvas();
  }
}

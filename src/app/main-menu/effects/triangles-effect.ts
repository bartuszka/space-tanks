import {Mouse} from "../triangles-button/models/mouse.model";
import {Renderer2} from "@angular/core";

export class TrianglesEffect {
  private renderer: Renderer2;
  private readonly canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private component: HTMLElement;
  private readonly triangleWidth: number;
  private triangleHeight: number;
  private mouse: Mouse;
  private readonly triangleColor: number[] = [128, 0, 0, 1];
  private readonly minDistance: number;
  private readonly maxDistance: number;
  private animationNumber: number;

  constructor(renderer: Renderer2,
              canvas: HTMLCanvasElement,
              component: HTMLElement,
              triangleWidth: number,
              minDistance: number = 2,
              maxDistance: number = 8,
              triangleColor: number[] = [0, 0, 0, 1]) {
    this.canvas = canvas;
    this.component = component;
    this.renderer = renderer;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.triangleWidth = triangleWidth;
    this.triangleColor = triangleColor;
    this.mouse = new Mouse();
    this.minDistance = minDistance;
    this.maxDistance = maxDistance;
  }

  public initializeCanvas(): void {
    this.renderer.setProperty(this.canvas, 'width', this.component.offsetWidth);
    this.renderer.setProperty(this.canvas, 'height', this.component.offsetHeight);
    this.triangleHeight = Math.sqrt(Math.pow(this.triangleWidth, 2) - Math.pow(this.triangleWidth / 2, 2));
    this.drawTriangles();
    this.setTrianglesListener();
  }

  public stopAnimation(): void {
    window.cancelAnimationFrame(this.animationNumber);
  }

  private drawTriangle(xPos: number, yPos: number, triangleSide: number): void {
    const triangleHeight = Math.sqrt(Math.pow(triangleSide, 2) - Math.pow(triangleSide / 2, 2));
    this.ctx.beginPath();
    this.ctx.moveTo(xPos, yPos + triangleHeight);
    this.ctx.lineTo(xPos + triangleSide, yPos + triangleHeight);
    this.ctx.lineTo(xPos + (triangleSide / 2), yPos);
    this.ctx.lineTo(xPos, yPos + triangleHeight);
    this.ctx.fillStyle =
      `rgba(${ this.triangleColor[0] },${ this.triangleColor[1] } ,${ this.triangleColor[2] }, ${ this.triangleColor[3] })`;
    this.ctx.fill();
    this.ctx.closePath();
  }

  private drawRotatedTriangle(xPos: number, yPos: number, triangleSide: number): void {
    const triangleHeight = Math.sqrt(Math.pow(triangleSide, 2) - Math.pow(triangleSide / 2, 2));
    this.ctx.beginPath();
    this.ctx.moveTo(xPos, yPos);
    this.ctx.lineTo(xPos + triangleSide, yPos);
    this.ctx.lineTo(xPos + (triangleSide / 2), yPos + triangleHeight);
    this.ctx.lineTo(xPos, yPos);
    this.ctx.fillStyle =
      `rgba(${ this.triangleColor[0] },${ this.triangleColor[1] } ,${ this.triangleColor[2] }, ${ this.triangleColor[3] })`;
    this.ctx.fill();
    this.ctx.closePath();
  }

  private getTriangleDistance(): number {
    const distance: number = this.minDistance + (Math.sqrt(1 / this.getMouseDistanceFromButtonCenter())) * (this.maxDistance - this.minDistance);
    return distance < this.maxDistance ? distance : this.maxDistance;
  }

  private drawTriangles = (): void => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    const numberOfTrianglesInRow: number = Math.ceil(this.component.offsetWidth / this.triangleWidth) * 2 + 1;
    const numberOfRows: number = Math.ceil(this.component.offsetHeight / this.triangleHeight) * 2;
    const triangleDistance = this.getTriangleDistance();

    const allTrianglesWidth: number = (this.triangleWidth / 2 + triangleDistance) * numberOfTrianglesInRow;
    const allTrianglesHeight: number = (this.triangleHeight + triangleDistance) * numberOfRows;

    for (let y = 0; y < numberOfRows; y++) {
      const currentPosY: number = (y * (this.triangleHeight + triangleDistance)) - this.triangleHeight / 2  -
        (allTrianglesHeight - this.canvas.height) / 2 - this.getMouseDistanceYFromButtonCenter() / 5;

      for (let x = 0; x < numberOfTrianglesInRow; x++) {
        const currentPosX: number = x * (this.triangleWidth / 2 + triangleDistance) - this.triangleWidth / 2 -
          (allTrianglesWidth - this.canvas.width) / 2 - this.getMouseDistanceXFromButtonCenter() / 5;

        if (x % 2 === 0) {
          this.triangleColor[3] = this.getTriangleOpacity(0.6);
          this.drawRotatedTriangle(currentPosX, currentPosY, this.triangleWidth);
        } else {
          this.triangleColor[3] = this.getTriangleOpacity(0.4);
          this.drawTriangle(currentPosX, currentPosY, this.triangleWidth);
        }
      }
    }
    this.getMouseDistanceFromButtonCenter();
    this.animationNumber = window.requestAnimationFrame(this.drawTriangles);
  }

  private getTriangleOpacity(maxOpacity: number): number {
    maxOpacity = maxOpacity <= 1 ? maxOpacity : 1;
    return maxOpacity - this.getMouseDistanceFromButtonCenter() / (this.canvas.width / 1.5);
  }

  private trianglesListener = (event: MouseEvent): void => {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.xMouse = event.clientX - rect.left;
    this.mouse.yMouse = event.clientY - rect.top;
  }

  private getMouseDistanceFromButtonCenter(): number {
    const distance = Math.floor(Math.sqrt(Math.pow(this.getMouseDistanceXFromButtonCenter(), 2) +
      Math.pow(this.getMouseDistanceYFromButtonCenter(), 2)));
    return distance > 1 ? distance : 1;
  }

  private getMouseDistanceXFromButtonCenter(): number {
    return this.mouse.xMouse - this.canvas.width / 2;
  }

  private getMouseDistanceYFromButtonCenter(): number {
    return this.mouse.yMouse - this.canvas.height / 2;
  }

  private setTrianglesListener(): void {
    this.canvas.addEventListener('mousemove', this.trianglesListener.bind(this));
    this.canvas.addEventListener('mouseleave', () => this.mouse.reset());
  }
}

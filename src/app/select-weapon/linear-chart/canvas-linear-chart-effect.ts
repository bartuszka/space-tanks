import {Renderer2} from "@angular/core";

class LinearChartPoint {
  constructor(private ctx: CanvasRenderingContext2D,
              public xPos: number,
              public yPos: number,
              public previousPoint?: LinearChartPoint) {}

  public drawLine(): void {
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'rgba(220, 220, 255,.6)';
    this.ctx.lineWidth = 2;
    this.ctx.moveTo(this.xPos, this.yPos);
    this.ctx.lineTo(this.previousPoint.xPos, this.previousPoint.yPos);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

class LinearChartStripe {
  constructor(private ctx: CanvasRenderingContext2D,
              private boxWidth: number,
              private width: number,
              private height: number,
              public xPos: number) {}

  public draw(): void {
    this.ctx.fillStyle = 'rgba(192, 192, 255,.2)'
    this.ctx.fillRect(this.xPos - this.width, 0, this.width, this.height);
    this.xPos++;

    if (this.xPos > this.boxWidth + this.width) {
      this.xPos = 0;
    }
  }
}

export class CanvasLinearChartEffect {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly chartPoints: LinearChartPoint[];
  private chartStripe: LinearChartStripe;
  private readonly fps: number;
  private pointsNumber: number = 60;
  private oldFpsDifference: number = 0;

  constructor(renderer: Renderer2, canvas: HTMLCanvasElement, containerElement: HTMLElement) {
    this.canvas = canvas;
    renderer.setProperty(this.canvas, 'width', containerElement.offsetWidth);
    renderer.setProperty(this.canvas, 'height', containerElement.offsetHeight);
    this.ctx = this.canvas.getContext('2d');
    this.chartPoints = [];
    this.chartStripe = new LinearChartStripe(this.ctx, this.canvas.width, 70, this.canvas.height, 0);
    this.fps = 24;
  }

  public initializeEffects(): void {
    this.animate();
  }

  private drawRandomPoints(currentTimerFps: number): void {
   if (currentTimerFps - this.oldFpsDifference > 1000 / this.fps) {
      this.oldFpsDifference = currentTimerFps;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.chartPoints.length = 0;

      for (let x = 0; x < this.pointsNumber; x++) {
        const newPointY: number = Math.random() * this.canvas.height/1.5 + this.canvas.height/6;
        const xDistance: number = this.canvas.width / (this.pointsNumber - 1);
        const newPointX: number = x * xDistance
        const newPoint: LinearChartPoint = new LinearChartPoint(this.ctx, newPointX, newPointY);

        if (x > 0) {
          newPoint.previousPoint = this.chartPoints[x - 1];
          newPoint.drawLine();
        }

        this.chartPoints.push(new LinearChartPoint(this.ctx, newPointX, newPointY));
      }
    }

   this.chartStripe.draw();
   window.requestAnimationFrame(this.drawRandomPoints.bind(this));
  }

  private animate(): void {
    this.drawRandomPoints(this.oldFpsDifference);
  }
}

export class Mouse {
  constructor(public xMouse: number = 0, public yMouse: number = 0) {};

  public reset(): void {
    this.xMouse = 0;
    this.yMouse = 0;
  }
}

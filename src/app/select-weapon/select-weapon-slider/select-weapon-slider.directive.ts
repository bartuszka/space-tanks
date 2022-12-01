import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2
} from "@angular/core";

@Directive({
  selector: '[appSelectWeaponSlider]'
})
export class SelectWeaponSliderDirective implements AfterViewInit {
  @Output() public scrollingStepSet: EventEmitter<number> = new EventEmitter<number>();
  @Input() public visibleRowsNumber: number;

  private _rowsNumber: number;
  private mouseMovingListener: ($event: MouseEvent) => void;
  private keyboardPressingListener: ($event: KeyboardEvent) => void;
  private scrollingHeight: number;
  private stepHeight: number;
  private currentStep: number = 0;

  @Input() public set rowsNumber(rowsNumber: number) {
    this._rowsNumber = rowsNumber;
    this.setStepHeight();
  };

  @Input() public set step(step: number) {
    if (step !== this.currentStep) {
      this.changeStep(step);
    }
  };

  public get rowsNumber(): number {
    return this._rowsNumber;
  }

  constructor(private elRef: ElementRef, private renderer: Renderer2) {};

  public ngAfterViewInit(): void {
    this.setScrollingHeight();
    this.setStepHeight();
  }

  @HostListener('mousedown', ['$event']) mousePressed(event: MouseEvent) {
    const rect: DOMRect = this.elRef.nativeElement.getBoundingClientRect();
    const startingYMouse: number = event.clientY - rect.top;
    this.mouseMovingListener = ($event: MouseEvent) => this.mouseMovingListenerHandler($event, startingYMouse);
    window.addEventListener('mousemove', this.mouseMovingListener)
  }

  @HostListener('focusin', ['$event']) keyboardPressed() {
    this.keyboardPressingListener = this.keyboardPressingListenerHandler.bind(this);
    window.addEventListener('keydown', this.keyboardPressingListener);
  }

  @HostListener('focusout', ['$event']) keyboardFocusedOut() {
    this.clearKeyboardInterval();
  }

  @HostListener('window:click', ['$event']) mouseReleased() {
    this.clearMouseInterval();
  }

  private setStepHeight(): void {
    const scrollableRowsNumber: number = this.rowsNumber - this.visibleRowsNumber;
    this.stepHeight = this.scrollingHeight / scrollableRowsNumber;
  }

  private keyboardPressingListenerHandler(event: KeyboardEvent): void {
    if (event.key === 'ArrowUp') {
      this.changeStep(this.currentStep - 1);
    } else if (event.key === 'ArrowDown') {
      this.changeStep(this.currentStep + 1);
    }
  }

  private mouseMovingListenerHandler(event: MouseEvent, startingYMouse: number): void {
    const rect: DOMRect = this.elRef.nativeElement.parentNode.getBoundingClientRect();
    const mouseY: number = event.clientY - rect.top;
    const sliderHeaderY: number = mouseY - startingYMouse;
    const currentStep: number = Math.floor(sliderHeaderY / this.stepHeight);
    this.changeStep(currentStep);
  }

  private changeStep(currentStep: number): void {
    const scrollableRowsNumber: number = this.rowsNumber - this.visibleRowsNumber;
    const sliderHeaderStepPosY: number = currentStep * this.stepHeight;

    if (currentStep >= 0 && currentStep <= scrollableRowsNumber) {
      this.renderer.setStyle(this.elRef.nativeElement, 'top', sliderHeaderStepPosY + 'px');
      this.scrollingStepSet.emit(currentStep);
      this.currentStep = currentStep;
    }
  }

  private clearMouseInterval(): void {
    if (!!this.mouseMovingListener) {
      window.removeEventListener('mousemove', this.mouseMovingListener);
    }
  }

  private clearKeyboardInterval(): void {
    if (!!this.keyboardPressingListener) {
      window.removeEventListener('keydown', this.keyboardPressingListener);
    }
  }

  private setScrollingHeight(): void {
    this.scrollingHeight = parseInt(getComputedStyle(this.elRef.nativeElement.parentNode).height) -
      parseInt(getComputedStyle(this.elRef.nativeElement).height) -
      parseInt(getComputedStyle(this.elRef.nativeElement.parentNode).borderWidth) * 2;
  }
}

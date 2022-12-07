import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener, Input,
  OnDestroy,
  Output,
  Renderer2
} from "@angular/core";
import {sliderNativeData} from "../models/slider-native-data";

@Directive({
  selector: '[appInnerSlider]'
})
export class InnerSliderDirective implements AfterViewInit, OnDestroy {
  @Output() public valueSet: EventEmitter<number> = new EventEmitter<number>();
  @Input() public initialValue: number = 0;

  private mouseListener: ($event: MouseEvent) => void;
  private keyPressListener: ($event: KeyboardEvent) => void;
  private sliderStyle: CSSStyleDeclaration;
  private sliderHeaderStyle: CSSStyleDeclaration;
  private maxSliderHeaderPosition: number;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  public ngAfterViewInit(): void {
    this.sliderStyle = getComputedStyle(this.elRef.nativeElement.parentNode);
    this.sliderHeaderStyle = getComputedStyle(this.elRef.nativeElement);
    this.maxSliderHeaderPosition = parseInt(this.sliderStyle.width) - parseInt(this.sliderHeaderStyle.width);
    this.setInitialHeadPosition();
  }

  public ngOnDestroy(): void {
    this.removeMouseListener();
    this.removeKeyboardListener();
  }

  @HostListener('mousedown', ['$event']) mousePressed($event: MouseEvent): void {
    const rect: DOMRect = this.elRef.nativeElement.getBoundingClientRect();
    const mouseX: number = $event.clientX - rect.left;

    if (!this.mouseListener) {
      this.mouseListener = ($event: MouseEvent) => this.dragSliderHead($event, mouseX);
      window.addEventListener('mousemove', this.mouseListener);
    }
  };

  @HostListener('focusin', ['$event']) focusedIn(): void {
    if (!this.keyPressListener) {
      this.keyPressListener = this.switchSliderHead;
      window.addEventListener('keydown', this.switchSliderHead);
    }
  };

  @HostListener('window:click') mouseLeaved(): void {
    this.removeMouseListener();
  };

  @HostListener('focusout', ['$event']) focusedOut(): void {
    this.removeKeyboardListener();
  };

  private removeMouseListener(): void {
    if (!!this.mouseListener) {
      window.removeEventListener('mousemove', this.mouseListener);
      this.mouseListener = null;
    }
  }

  private removeKeyboardListener(): void {
    if (!!this.switchSliderHead) {
      window.removeEventListener('keydown', this.switchSliderHead);
      this.keyPressListener = null;
    }
  }

  private dragSliderHead = (event: MouseEvent, startingMouseX: number): void => {
    const parentRect: DOMRect = this.elRef.nativeElement.parentNode.getBoundingClientRect();
    const mouseX: number = event.clientX - parentRect.left - parseInt(getComputedStyle(this.elRef.nativeElement.parentNode).borderWidth);
    let headerX: number = mouseX - startingMouseX;
    headerX = mouseX - startingMouseX >= 0 ? headerX : 0;
    headerX = mouseX - startingMouseX <= this.maxSliderHeaderPosition ? headerX : this.maxSliderHeaderPosition;
    this.setSliderHeadPosition(headerX);
  }

  private switchSliderHead = (event: KeyboardEvent): void => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      const step = 10 * (event.key === 'ArrowRight' ? 1 : -1);
      let currentSliderHeadPosition: number = Math.floor(this.elRef.nativeElement.offsetLeft + step);
      currentSliderHeadPosition = currentSliderHeadPosition >= 0 ? currentSliderHeadPosition : 0;
      currentSliderHeadPosition = currentSliderHeadPosition <= this.maxSliderHeaderPosition ? currentSliderHeadPosition : this.maxSliderHeaderPosition;
      this.setSliderHeadPosition(currentSliderHeadPosition);
    }
  }

  private setSliderHeadPosition(sliderHeadPosition: number): void {
    this.renderer.setStyle(this.elRef.nativeElement, 'left', sliderHeadPosition + 'px');
    this.valueSet.emit(Math.ceil(this.elRef.nativeElement.offsetLeft / this.maxSliderHeaderPosition * sliderNativeData.maxValue));
  }

  private setInitialHeadPosition(): void {
    this.renderer.setStyle(this.elRef.nativeElement, 'left', this.maxSliderHeaderPosition / sliderNativeData.maxValue * this.initialValue + 'px');
  }
}

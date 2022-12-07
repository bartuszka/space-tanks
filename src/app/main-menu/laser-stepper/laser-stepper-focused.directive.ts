import {Directive, ElementRef, HostListener, Renderer2} from "@angular/core";

@Directive({
  selector: '[laserStepperFocused]'
})
export class LaserStepperFocusedDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('focusin') public focusedIn() {
    this.renderer.addClass(this.elRef.nativeElement.parentNode, 'firefox-focus-visible');
  }

  @HostListener('focusout') public focusedOut() {
    this.renderer.removeClass(this.elRef.nativeElement.parentNode, 'firefox-focus-visible');
  }

  @HostListener('keydown', ['$event']) public mousePressed(event: KeyboardEvent) {
    if (event.key !== 'Tab') {
      this.renderer.addClass(this.elRef.nativeElement, 'firefox-active-keyboard');
    }
  }

  @HostListener('keyup') public mouseReleased() {
    this.renderer.removeClass(this.elRef.nativeElement, 'firefox-active-keyboard');
  }
}

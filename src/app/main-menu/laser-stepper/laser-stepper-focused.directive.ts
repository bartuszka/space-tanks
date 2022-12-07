import {Directive, ElementRef, HostListener, Renderer2} from "@angular/core";

@Directive({
  selector: '[laserStepperFocused]'
})
export class LaserStepperFocusedDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('focusin') public focusedIn() {
    this.renderer.addClass(this.elRef.nativeElement.parentNode, 'focused');
  }

  @HostListener('focusout') public focusedOut() {
    this.renderer.removeClass(this.elRef.nativeElement.parentNode, 'focused');
  }
}

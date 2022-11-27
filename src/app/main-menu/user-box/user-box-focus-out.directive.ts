import {Directive, ElementRef, EventEmitter, HostListener, Output} from "@angular/core";

@Directive({
  selector: '[appUserBoxFocusOut]'
})
export class UserBoxFocusOutDirective {
  @Output() public userBoxFocusedOut: EventEmitter<Event> = new EventEmitter<Event>();

  private isActive: boolean = false;

  constructor(private elRef: ElementRef) {}

  @HostListener('focusin', ['$event']) private focusedIn(event: Event): void {
    this.isActive = true;
  }

  @HostListener('document:mousedown', ['$event']) private clickedOut(event: Event): void {
    if(this.isActive && !this.elRef.nativeElement.contains(event.target)) {
      this.isActive = false;
      this.userBoxFocusedOut.next(event);
    }
  }
}

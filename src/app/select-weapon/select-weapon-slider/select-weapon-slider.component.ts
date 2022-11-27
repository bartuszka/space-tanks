import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-select-weapon-slider',
  templateUrl: './select-weapon-slider.component.html',
  styleUrls: ['./select-weapon-slider.component.scss']
})
export class SelectWeaponSliderComponent {
  @Output() public scrollingStepChanged: EventEmitter<number> = new EventEmitter<number>();
  @Input() public step: number = 0;
  @Input() public rowsNumber: number;
  @Input() public visibleRowsNumber: number;

  public emitScrollingStep(scrollingStep: number): void {
    this.scrollingStepChanged.emit(scrollingStep);
  }
}

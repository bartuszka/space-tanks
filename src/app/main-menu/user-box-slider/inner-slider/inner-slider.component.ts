import {Component, EventEmitter, Input, Output} from '@angular/core';
import {sliderNativeData} from "../models/slider-native-data";

@Component({
  selector: 'app-inner-slider',
  templateUrl: './inner-slider.component.html',
  styleUrls: ['./inner-slider.component.scss']
})
export class InnerSliderComponent {
  @Output() public innerSliderValueSet: EventEmitter<number> = new EventEmitter<number>();
  @Input() public minValue: number = sliderNativeData.minValue;
  @Input() public maxValue: number = sliderNativeData.maxValue;

  private _initialValue: number = 0;

  @Input() set initialValue(value: number) {
    if (!!value && value !== this._initialValue) {
      this._initialValue = Math.round((value - this.minValue) / (this.maxValue - this.minValue) * sliderNativeData.maxValue);
    }
  };

  public get initialValue(): number {
    return this._initialValue;
  }

  public emitInnerSliderValue(sliderValue: number): void {
    this.innerSliderValueSet.emit(this.minValue + (sliderValue * this.maxValue / sliderNativeData.maxValue) -
      this.minValue * sliderValue / sliderNativeData.maxValue);
  }
}

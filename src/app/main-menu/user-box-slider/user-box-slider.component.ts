import {
  Component,
  Input,
} from '@angular/core';
import {sliderNativeData} from "./models/slider-native-data";
import {CustomFormField, customFormFieldProvider} from "../../models/custom-form-field";

@Component({
  selector: 'app-user-box-slider',
  templateUrl: './user-box-slider.component.html',
  styleUrls: ['./user-box-slider.component.scss'],
  providers: [customFormFieldProvider(UserBoxSliderComponent)]
})
export class UserBoxSliderComponent extends CustomFormField<number> {
  @Input() public startLabel: string = null;
  @Input() public middleLabel: string = null;
  @Input() public endLabel: string = null;
  @Input() public valueLabel: string = null;
  @Input() public minValue: number = sliderNativeData.minValue;
  @Input() public maxValue: number = sliderNativeData.maxValue;
}

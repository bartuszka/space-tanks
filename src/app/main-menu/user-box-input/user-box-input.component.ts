import {Component, Input} from '@angular/core';
import {CustomFormField, customFormFieldProvider} from "../../models/custom-form-field";

@Component({
  selector: 'app-user-box-input',
  templateUrl: './user-box-input.component.html',
  styleUrls: ['./user-box-input.component.scss'],
  providers: [customFormFieldProvider(UserBoxInputComponent)]
})
export class UserBoxInputComponent extends CustomFormField<string> {
  @Input() public isDisabled: boolean = false;
  @Input() public initialValue: string = 'Initial value';
}

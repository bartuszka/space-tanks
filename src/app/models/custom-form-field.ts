import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Component, forwardRef, InjectionToken, Input, Type} from "@angular/core";

interface CustomFormFieldProvider {
  provide: InjectionToken<readonly ControlValueAccessor[]>;
  useExisting: Type<any>;
  multi: boolean;
}

export function customFormFieldProvider<T>(customFormFieldClass: new () => T): CustomFormFieldProvider {
 return {
   provide: NG_VALUE_ACCESSOR,
   useExisting: forwardRef(() => customFormFieldClass),
   multi: true
 }
}

@Component({
  selector: 'app-custom-form=field',
  template: '',
})
export class CustomFormField<T> implements ControlValueAccessor {
  protected _fieldValue: T;

  @Input() public set value(value: T) {
    if (value !== this._fieldValue) {
      this._fieldValue = value;
    }
  }

  public get value(): T {
    return this._fieldValue;
  }

  public writeValue(value: any) {
    this.value = value;
  }

  public onBlur() {
    this.onTouchedCallback();
    this.onChangeCallback(this._fieldValue);
  }

  public registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  protected onTouchedCallback = (): void => {};
  protected onChangeCallback = (value: T): void => {};
}

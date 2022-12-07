import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'arrayFromNumber'
})
export class ArrayFromNumberPipe implements PipeTransform {
  transform(value: number): number[] {
    return value ? new Array(value).fill(0) : null;
  }
}

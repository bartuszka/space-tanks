import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'squaresInCol'
})
export class SquaresInColPipe implements PipeTransform {
  transform(value: any[]): number[] {
    return value.slice(Math.floor(Math.random() * value.length), value.length);
  }
}

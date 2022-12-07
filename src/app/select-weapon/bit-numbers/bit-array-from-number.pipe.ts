import {Pipe, PipeTransform} from "@angular/core";
import {BitNumbersMode} from "../weapon-list/models/bit-numbers-mode.model";

@Pipe({
  name: 'bitArrayFromValue'
})
export class BitArrayFromNumberPipe implements PipeTransform {
  transform(value: number[], mode: BitNumbersMode = BitNumbersMode.NUMBERS, interval: number): number[] {
    return value.map(() => mode === BitNumbersMode.NUMBERS ? this.getZeroOrOne() : this.getColor());
  }

  private getZeroOrOne(): number {
    return Math.random() > .5 ? 1 : 0;
  }

  private getColor(): number {
    return Math.ceil(Math.random() * 4);
  }
}

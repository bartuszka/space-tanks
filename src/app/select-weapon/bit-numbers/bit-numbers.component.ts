import {Component, Input, OnInit} from '@angular/core';
import {BitNumbersOrientation} from "../weapon-list/models/bit-numbers-orientation.model";
import {interval, Observable, takeUntil, tap} from "rxjs";
import {Destroyable} from "../../components/destroyable.component";
import {BitNumbersMode} from "../weapon-list/models/bit-numbers-mode.model";

@Component({
  selector: 'app-bit-numbers',
  templateUrl: './bit-numbers.component.html',
  styleUrls: ['./bit-numbers.component.scss']
})
export class BitNumbersComponent extends Destroyable implements OnInit {
  @Input() public mode: BitNumbersMode = BitNumbersMode.NUMBERS;
  @Input() public orientation: BitNumbersOrientation;
  @Input() public bitCols: number;
  @Input() public bitRows: number;
  @Input() public bitSegments: number;

  public bitNumbersOrientations: typeof BitNumbersOrientation = BitNumbersOrientation;
  public bitNumberModes: typeof BitNumbersMode = BitNumbersMode;
  public interval: number = 0;

  private bitInterval$: Observable<number>;

  public ngOnInit(): void {
    this.bitInterval$ = interval(500)
    this.changeBitValues();
  }

  private changeBitValues(): void {
    this.bitInterval$.pipe(
      takeUntil(this.$destroyed),
      tap((interval: number) => this.interval = interval)
    ).subscribe();
  }
}

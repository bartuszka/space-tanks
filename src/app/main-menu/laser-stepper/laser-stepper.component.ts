import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-laser-stepper',
  templateUrl: './laser-stepper.component.html',
  styleUrls: ['./laser-stepper.component.scss']
})
export class LaserStepperComponent {
  @Input() public label: string = 'Label';
  public rounds: number = 3;

  public addRound(): void {
    this.rounds = this.rounds < 5 ? ++this.rounds : this.rounds;
  }

  public subtractRound(): void {
    this.rounds = this.rounds > 1 ? --this.rounds : 1;
  }

  public removeFocus(arrowLeftButton: HTMLButtonElement, arrowRightButton: HTMLButtonElement): void {
    arrowLeftButton.blur();
    arrowRightButton.blur();
  }
}

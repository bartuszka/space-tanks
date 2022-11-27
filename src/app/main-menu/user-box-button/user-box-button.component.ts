import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-user-box-button',
  templateUrl: './user-box-button.component.html',
  styleUrls: ['./user-box-button.component.scss'],
})
export class UserBoxButtonComponent<UserBoxButtonState> implements OnInit {
  @Output() public stateChanged: EventEmitter<UserBoxButtonState> = new EventEmitter<UserBoxButtonState>();
  @Input() public states: UserBoxButtonState[];
  @Input() public currentState: UserBoxButtonState;
  @Input() public label: string;
  @Input() public src: string;

  public ngOnInit(): void {
    this.currentState = this.currentState || this.states[0];
  }

  public switch(): void {
    const nextStateIndex: number = this.states.findIndex((state: UserBoxButtonState) => state === this.currentState) + 1;
    this.currentState = nextStateIndex < this.states.length ? this.states[nextStateIndex] : this.states[0];
    this.stateChanged.emit(this.currentState);
  }
}

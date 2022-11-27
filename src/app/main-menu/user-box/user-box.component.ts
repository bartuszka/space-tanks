import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {TrianglesEffect} from "../effects/triangles-effect";
import {UserMode} from "../../models/user-mode.model";
import {User} from "../../models/user.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Destroyable} from "../../components/destroyable.component";
import {userModeData, UserModeData} from "./models/user-mode-data";

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
  styleUrls: ['./user-box.component.scss'],
})
export class UserBoxComponent extends Destroyable implements OnInit, AfterViewInit {
  @Output() public userChanged: EventEmitter<User> = new EventEmitter<User>();
  @Input() public boxId: number;

  @ViewChild('userBoxCanvas', { static: false }) private userBoxCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('userBox', { static: false }) private userBox: ElementRef<HTMLElement>;

  public userModes: typeof UserMode = UserMode;
  public userModesArray: UserMode[];
  public userButtonData: { [key: string]: UserModeData };
  public userForm: FormGroup;

  private savedUserData: { [key: string]: User } = {};
  private trianglesEffect: TrianglesEffect;

  constructor(private renderer: Renderer2, private fb: FormBuilder) {
    super();
  }

  @Input() public set user(user: User) {
    if (!this.userForm) {
      this.setSavedUser(user);
      this.initializeUserForm(user);
    }
  }

  public ngOnInit(): void {
    this.userModesArray = Object.values(UserMode);
    this.userButtonData = userModeData;
  }

  public ngAfterViewInit(): void {
    this.setCanvasEffect();
  }

  public changeUserMode(userMode: UserMode): void {
    this.setSavedUser(this.userForm.value);
    this.setFormDataForUserMode(userMode);
  }

  public emitUserData(): void {
    this.userChanged.emit(this.userForm.value);
  }

  private setFormDataForUserMode(userMode: UserMode): void {
    const savedUserData: User = this.savedUserData[userMode];
    this.userForm
      .setValue({ ...(savedUserData || userModeData[userMode].initialData), id: this.userForm.get('id').value });
  }

  private setSavedUser(user: User): void {
    this.savedUserData[user.mode] = user;
  }

  private initializeUserForm(user: User): void {
    this.userForm = this.fb.group(user);
    this.userForm.setValue(user);
  }

  private setCanvasEffect(): void {
    this.trianglesEffect = new TrianglesEffect(
      this.renderer,
      this.userBoxCanvas.nativeElement,
      this.userBox.nativeElement,
      Math.floor(this.userBox.nativeElement.offsetHeight / 5),
      5,
      40,
      [0, 0, 0, 1]
    );
    this.trianglesEffect.initializeCanvas();
  }
}

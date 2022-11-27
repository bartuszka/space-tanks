import {Subject} from "rxjs";
import {Directive, OnDestroy} from "@angular/core";

@Directive({
  selector: '[app-destroyable]',
})
export class Destroyable implements OnDestroy {
  protected $destroyed: Subject<void> = new Subject<void>();

  public ngOnDestroy() {
    this.$destroyed.next();
  }
}

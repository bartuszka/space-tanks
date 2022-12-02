import {Component, Input} from "@angular/core";

@Component({
  selector: 'app-weapon-information-piece',
  templateUrl: './weapon-information-piece.html',
  styleUrls: ['./weapon-information-piece.scss']
})
export class WeaponInformationPiece {
  @Input() public content: number | string;
  @Input() public label: string;
}

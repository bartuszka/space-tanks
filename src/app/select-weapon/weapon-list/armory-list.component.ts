import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ScrollingTableHeader, ScrollingTableItem} from "./models/scrolling-table-item.model";
import {VisibleTableItemsPipe} from "./pipes/visible-table-items.pipe";
import {ScrollingDirection} from "./models/scrolling-direction.model";

@Component({
  selector: 'app-armory-list',
  templateUrl: './armory-list.component.html',
  styleUrls: ['./armory-list.component.scss']
})
export class ArmoryListComponent implements OnInit {
  @Output() itemSelected: EventEmitter<number> = new EventEmitter<number>();
  @Output() valueChanged: EventEmitter<ScrollingTableItem[]> = new EventEmitter<ScrollingTableItem[]>();
  @Input() public tableHeader: ScrollingTableHeader;
  @Input() public visibleItemsNumber: number = 5;

  @Input() public set tableItems(tableItems: ScrollingTableItem[]) {
    this._tableItems = tableItems;
    this.valueChanged.emit(this.tableItems);
  }

  public sliderCurrentStep: number;
  public lastScrollingStep: number;
  public selectedItem: ScrollingTableItem;

  private _tableItems: ScrollingTableItem[];
  private scrollingBlocked: boolean = false;

  constructor(private visibleTableItemsPipe: VisibleTableItemsPipe) {}

  public get tableItems(): ScrollingTableItem[] {
    return this._tableItems;
  }

  public ngOnInit() {
    this.resetSlider();
    this.setSelectedMiddleItem();
  }

  public scrollListDown(): void {
    if (this.sliderCurrentStep < this.lastScrollingStep && !this.scrollingBlocked) {
      this.sliderCurrentStep++;
      this.setSelectedMiddleItem();
    } else {
      this.setSelectedItem(ScrollingDirection.DOWN);
    }
  }

  public scrollListUp(): void {
    if (this.sliderCurrentStep > 0 && !this.scrollingBlocked) {
      this.sliderCurrentStep--;
      this.setSelectedMiddleItem();
    } else {
      this.setSelectedItem(ScrollingDirection.UP);
    }
  }

  public scrollListToItem(scrollingStep: number): void {
    this.sliderCurrentStep = scrollingStep;
    this.setSelectedMiddleItem();
  }

  private setSelectedMiddleItem(): void {
    const visibleItems: ScrollingTableItem[] = this.getVisibleItems();
    this.selectedItem = visibleItems[Math.floor(this.visibleItemsNumber / 2)];
    this.itemSelected.emit(this.selectedItem.id);
  }

  public resetSlider(): void {
    this.scrollingBlocked = false;
    this.lastScrollingStep = this.tableItems.length - this.visibleItemsNumber;
    this.scrollListToItem(0);
  }

  private setSelectedItem(scrollingDirection: ScrollingDirection): void {
    const visibleItems: ScrollingTableItem[] = this.getVisibleItems();

    const newSelectedItemIndex: number =
      this.tableItems.findIndex((tableItem: ScrollingTableItem) => tableItem.id === this.selectedItem.id) +
      (scrollingDirection === ScrollingDirection.DOWN ? 1 : -1);

    if (scrollingDirection === ScrollingDirection.DOWN) {
      this.selectedItem = newSelectedItemIndex < this.tableItems.length ?
        this.tableItems[newSelectedItemIndex] : this.tableItems[this.tableItems.length - 1];
    }

    if (scrollingDirection === ScrollingDirection.UP) {
      this.selectedItem = newSelectedItemIndex > 0 ?
        this.tableItems[newSelectedItemIndex] : this.tableItems[0];
    }

    this.itemSelected.emit(this.selectedItem.id);
    this.scrollingBlocked = !(this.selectedItem.id === visibleItems[Math.floor(this.visibleItemsNumber / 2)].id);
  }

  private getVisibleItems(): ScrollingTableItem[] {
    return this.visibleTableItemsPipe.transform(this.tableItems, this.visibleItemsNumber, this.sliderCurrentStep);
  }
}

import {Pipe, PipeTransform} from "@angular/core";
import {ScrollingTableItem} from "../models/scrolling-table-item.model";

@Pipe({
  name: 'visibleTableItems'
})
export class VisibleTableItemsPipe implements PipeTransform {
  transform(tableItems: ScrollingTableItem[], visibleItems: number, firstItem: number): ScrollingTableItem[] {
    const lastItem: number = firstItem + visibleItems;

    if (tableItems.length < visibleItems) {
      return tableItems;
    }

    if (firstItem < 0) {
      return tableItems.slice(0, visibleItems);
    }

    return tableItems.length >= lastItem ? tableItems.slice(firstItem, lastItem) :
      tableItems.slice(tableItems.length - visibleItems, tableItems.length);
  }
}

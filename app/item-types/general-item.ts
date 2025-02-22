import { IGildedRoseItem } from "@/gilded-rose";
import { Item } from "@/item-types/item";

export class GeneralItem implements IGildedRoseItem {
  item: Item;

  static MAX_QUALITY = 50;
  static MIN_QUALITY = 0;

  constructor(item: Item) {
    this.item = item;
  }

  update() {
    this.elapseOneDay();

    this.decreaseQualityToMin();

    if (this.item.sellIn < 0) {
      this.decreaseQualityToMin();
    }

    return this;
  }

  elapseOneDay() {
    this.item.sellIn -= 1;
  }

  isExpired() {
    return this.item.sellIn < 0;
  }

  increaseQualityToMax(factor = 1) {
    if (this.item.quality < GeneralItem.MAX_QUALITY) {
      this.item.quality += factor;
    }
    return this;
  }

  decreaseQualityToMin(factor = 1) {
    if (this.item.quality > GeneralItem.MIN_QUALITY) {
      this.item.quality -= factor;
    }
  }
}

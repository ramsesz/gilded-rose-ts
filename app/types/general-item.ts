import { IGildedRoseItem, Item } from "@/gilded-rose";

export class GeneralItem implements IGildedRoseItem {
  item: Item;

  constructor(item: Item) {
    this.item = item;
  }

  update() {
    this.elapseOneDay();

    this.item.quality -= 1;

    if (this.item.sellIn < 0) {
      this.item.quality -= 1;
    }

    this.ensureQuality();

    return this;
  }

  elapseOneDay() {
    this.item.sellIn -= 1;
  }

  ensureQuality() {
    if(this.item.quality < 0) {
      this.item.quality = 0;
      return this.item
    }

    if(this.item.quality > 50) {
      this.item.quality = 50;
    }

    return this;
  }
}

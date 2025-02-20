import { Item } from "@/gilded-rose";

export class GeneralItem {
  item: Item;

  constructor(item: Item) {
    this.item = item;
  }

  update() {
    this.item.sellIn -= 1;
    this.item.quality -= 1;

    if (this.item.sellIn < 0) {
      this.item.quality -= 1;
    }

    if (this.item.quality < 0) {
      this.item.quality = 0;
    }

    return this.item;
  }
}

import { Item } from "@/gilded-rose";
import { GeneralItem } from "@/types/general-item";

export class BackstagePasses extends GeneralItem {
  update() {
    this.item.sellIn -= 1;

    if (this.item.sellIn < 0) {
      this.item.quality = 0;
      return this.item;
    }

    this.item.quality += 1;

    if (this.item.sellIn < 10) {
      this.item.quality += 1;
    }

    if (this.item.sellIn < 5) {
      this.item.quality += 1;
    }

    if (this.item.quality > 50) {
      this.item.quality = 50;
    }

    return this.item;
  }
}

import { IGildedRoseItem } from "@/gilded-rose";
import { GeneralItem } from "@/types/general-item";

export class BackstagePasses extends GeneralItem implements IGildedRoseItem {
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

    this.ensureQuality();

    return this.item;
  }
}

import { IGildedRoseItem } from "@/gilded-rose";
import { GeneralItem } from "@/types/general-item";

export class Conjured extends GeneralItem {
  update() {
    this.item.sellIn -= 1;
    this.item.quality -= 2;

    if (this.item.sellIn < 0) {
      this.item.quality -= 2;
    }

    this.ensureQuality();

    return this;
  }
}

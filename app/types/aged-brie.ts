import { IGildedRoseItem } from "@/gilded-rose";
import { GeneralItem } from "@/types/general-item";

export class AgedBrie extends GeneralItem implements IGildedRoseItem {
  update() {
    this.elapseOneDay();

    this.item.quality += 1;

    if (this.item.sellIn < 0) {
      this.item.quality += 1;
    }

    this.ensureQuality();

    return this;
  }
}

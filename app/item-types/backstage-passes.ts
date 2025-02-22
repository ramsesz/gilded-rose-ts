import { IGildedRoseItem } from "@/gilded-rose";
import { GeneralItem } from "@/item-types/general-item";

export class BackstagePasses extends GeneralItem implements IGildedRoseItem {
  update() {
    this.elapseOneDay();

    if (this.isExpired()) {
      this.item.quality = 0;
      return this;
    }

    this.increaseQualityToMax();

    if (this.item.sellIn < 10) {
      this.increaseQualityToMax();
    }

    if (this.item.sellIn < 5) {
      this.increaseQualityToMax();
    }

    return this;
  }
}

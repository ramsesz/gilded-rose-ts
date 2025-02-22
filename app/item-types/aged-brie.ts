import { IGildedRoseItem } from "@/gilded-rose";
import { GeneralItem } from "@/item-types/general-item";

export class AgedBrie extends GeneralItem implements IGildedRoseItem {
  update() {
    this.elapseOneDay();

    this.increaseQualityToMax();

    if (this.isExpired()) {
      this.increaseQualityToMax();
    }

    return this;
  }
}

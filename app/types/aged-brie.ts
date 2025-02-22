import { IGildedRoseItem } from "@/gilded-rose";
import { GeneralItem } from "@/types/general-item";

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

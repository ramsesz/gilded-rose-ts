import { IGildedRoseItem } from "@/gilded-rose";
import { GeneralItem } from "@/item-types/general-item";

export class Conjured extends GeneralItem {
  update() {
    this.elapseOneDay();

    this.decreaseQualityToMin(2);

    if (this.isExpired()) {
      this.decreaseQualityToMin(2);
    }

    return this;
  }
}

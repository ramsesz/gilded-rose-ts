import { Item } from "@/gilded-rose";
import { GeneralItem } from "@/types/general-item";

export class AgedBrie extends GeneralItem {
  update() {
    this.item.sellIn -= 1;
    this.item.quality += 1;

    if (this.item.sellIn < 0) {
      this.item.quality += 1;
    }
    
    this.ensureQuality();

    return this.item;
  }
}

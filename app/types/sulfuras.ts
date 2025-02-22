import { IGildedRoseItem } from "@/gilded-rose";
import { GeneralItem } from "@/types/general-item";

export class Sulfuras extends GeneralItem implements IGildedRoseItem {
  update() {
    // do nothing
    return this.item;
  }
}

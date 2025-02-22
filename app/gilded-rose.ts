import { AgedBrie } from "@/item-types/aged-brie";
import { BackstagePasses } from "@/item-types/backstage-passes";
import { Conjured } from "@/item-types/conjured";
import { GeneralItem } from "@/item-types/general-item";
import { Item } from "@/item-types/item";
import { Sulfuras } from "@/item-types/sulfuras";

export const ITEM_NAMES = {
  AGED_BRIE: "Aged Brie",
  BACKSTAGE_PASSES: "Backstage passes",
  CONJURED: "Conjured",
  SULFURAS: "Sulfuras",
};

const ITEM_CLASS_BY_NAME = {
  [ITEM_NAMES.AGED_BRIE]: AgedBrie,
  [ITEM_NAMES.BACKSTAGE_PASSES]: BackstagePasses,
  [ITEM_NAMES.CONJURED]: Conjured,
  [ITEM_NAMES.SULFURAS]: Sulfuras,
};

export interface IGildedRoseItem {
  item: Item;
  update: () => IGildedRoseItem;
}

export class GildedRose {
  //TODO: Check if I can change Item type here
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    //TODO: This could be move to constructor if items property type is allowed to change
    const items: Array<IGildedRoseItem> = this.items.map(
      (item) => new (this.classFrom(item.name))(item)
    );

    items.forEach((item) => {
      item.update();
    });

    return this;
  }

  private classFrom(name: string) {
    const classNameMatch = Object.keys(ITEM_CLASS_BY_NAME).find(
      (startsWithMatch) => name.startsWith(startsWithMatch)
    );

    if(!classNameMatch) {
      return GeneralItem;
    }
    
    return ITEM_CLASS_BY_NAME[classNameMatch];
  }
}

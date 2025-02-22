import { AgedBrie } from "@/types/aged-brie";
import { BackstagePasses } from "@/types/backstage-passes";
import { Sulfuras } from "@/types/sulfuras";
import { GeneralItem } from "@/types/general-item";

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export const ITEM_NAMES = {
  AGED_BRIE: "Aged Brie",
  BACKSTAGE_PASSES: "Backstage passes to a TAFKAL80ETC concert",
  SULFURAS: "Sulfuras, Hand of Ragnaros",
};

const ITEM_CLASS_BY_NAME = {
  [ITEM_NAMES.AGED_BRIE]: AgedBrie,
  [ITEM_NAMES.BACKSTAGE_PASSES]: BackstagePasses,
  [ITEM_NAMES.SULFURAS]: Sulfuras,
};

export interface IGildedRoseItem {
  item: Item;
  update: () => Item;
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

    return this.items;
  }

  classFrom(name: string) {
    return ITEM_CLASS_BY_NAME[name] || GeneralItem;
  }
}

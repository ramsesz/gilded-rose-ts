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

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      switch (item.name) {
        case ITEM_NAMES.AGED_BRIE:
          new AgedBrie(item).update();
          return;
        case ITEM_NAMES.BACKSTAGE_PASSES:
          new BackstagePasses(item).update();
          return;
        case ITEM_NAMES.SULFURAS:
          new Sulfuras(item).update();
          return;
        default:
          new GeneralItem(item).update();
          return;
      }
    });

    return this.items;
  }
}

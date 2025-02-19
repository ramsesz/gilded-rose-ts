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

  updateAgedBrie(item: Item) {
    item.sellIn -= 1;
    item.quality += 1;

    if (item.sellIn < 0) {
      item.quality += 1;
    }
    if (item.quality > 50) {
      item.quality = 50;
    }

    return item;
  }

  updateBackstagePasses(item: Item) {
    item.sellIn -= 1;

    if (item.sellIn < 0) {
      item.quality = 0;
      return item;
    }

    item.quality += 1;

    if (item.sellIn < 10) {
      item.quality += 1;
    }

    if (item.sellIn < 5) {
      item.quality += 1;
    }

    if (item.quality > 50) {
      item.quality = 50;
    }

    return item;
  }

  updateSulfuras(item: Item) {
    return item;
  }

  updateGeneralItem(item: Item) {
    item.sellIn -= 1;
    item.quality -= 1;

    if (item.sellIn < 0) {
      item.quality -= 1;
    }

    if (item.quality < 0) {
      item.quality = 0;
    }

    return item;
  }

  updateQuality() {
    this.items.forEach((item) => {
      if (item.name === ITEM_NAMES.AGED_BRIE) {
        this.updateAgedBrie(item);
        return;
      }

      if (item.name === ITEM_NAMES.BACKSTAGE_PASSES) {
        this.updateBackstagePasses(item);
        return;
      }

      if (item.name === ITEM_NAMES.SULFURAS) {
        this.updateSulfuras(item);
        return;
      }

      this.updateGeneralItem(item);
      return;

      if (
        item.name != ITEM_NAMES.AGED_BRIE &&
        item.name != ITEM_NAMES.BACKSTAGE_PASSES
      ) {
        if (item.quality > 0) {
          if (item.name != ITEM_NAMES.SULFURAS) {
            item.quality = item.quality - 1;
          }
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
          if (item.name == ITEM_NAMES.BACKSTAGE_PASSES) {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
          }
        }
      }
      if (item.name != ITEM_NAMES.SULFURAS) {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (item.name != ITEM_NAMES.AGED_BRIE) {
          if (item.name != ITEM_NAMES.BACKSTAGE_PASSES) {
            if (item.quality > 0) {
              if (item.name != ITEM_NAMES.SULFURAS) {
                item.quality = item.quality - 1;
              }
            }
          } else {
            item.quality = item.quality - item.quality;
          }
        } else {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
      }
    });

    return this.items;
  }
}

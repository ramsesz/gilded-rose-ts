import { GildedRose, ITEM_NAMES } from "@/gilded-rose";
import { Item } from "@/types/item";

describe('Gilded Rose', () => {

  it("should initiate gilded rose", () => {
    const gildedRose = new GildedRose();
    const items = gildedRose.updateQuality();
    expect(gildedRose.items.length).toBe(0);
  });

  it("should add new item", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const added = gildedRose.items[0];
    expect(added.name).toEqual("foo");
    expect(added.quality).toEqual(0);
    expect(added.sellIn).toEqual(0);
  });
});

describe("General quality rules", () => {
  it("should update quality for sellIn > 0 days", () => {
    const gildedRose = new GildedRose([new Item("foo", 1, 1)]);
    gildedRose.updateQuality();
    const added = gildedRose.items[0];
    expect(added.quality).toEqual(0);
    expect(added.sellIn).toEqual(0);
  });

  it("should update quality 2x as fast for sellIn < 0 days", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 4)]);
    gildedRose.updateQuality();
    const added = gildedRose.items[0];
    expect(added.quality).toEqual(2);
    expect(added.sellIn).toEqual(-1);
  });

  it("quality should never go below 0", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    gildedRose.updateQuality();
    const added = gildedRose.items[0];
    expect(added.quality).toEqual(0);
    expect(added.sellIn).toEqual(-1);
  });
});

describe("aged brie quality", () => {
  it("quality of Aged Brie should go up", () => {
    const gildedRose = new GildedRose([new Item(ITEM_NAMES.AGED_BRIE, 1, 1)]);
    gildedRose.updateQuality();
    const added = gildedRose.items[0];
    expect(added.quality).toEqual(2);
    expect(added.sellIn).toEqual(0);
  });

  it("quality should never go above 50", () => {
    const gildedRose = new GildedRose([new Item(ITEM_NAMES.AGED_BRIE, 1, 50)]);
    gildedRose.updateQuality();
    const added = gildedRose.items[0];
    expect(added.quality).toEqual(50);
    expect(added.sellIn).toEqual(0);
  });

  it("should allow quality of aged brie to be incremented up to 50", () => {
    const gildedRose = new GildedRose([
      new Item(ITEM_NAMES.AGED_BRIE, -10, 10),
    ]);
    gildedRose.updateQuality();
    const added = gildedRose.items[0];
    expect(added.quality).toEqual(12);
    expect(added.sellIn).toEqual(-11);
  });
});

describe("backstage pass quality rules", () => {
  it("should increase quality of backstage passes by 1 when more than 10 days remaining", () => {
    const gildedRose = new GildedRose([
      new Item(ITEM_NAMES.BACKSTAGE_PASSES, 11, 1),
    ]);
    gildedRose.updateQuality();
    const added = gildedRose.items[0];
    expect(added.quality).toEqual(2);
    expect(added.sellIn).toEqual(10);
  });

  it("should increase quality of backstage passes by 2 when more than 5 days remaining", () => {
    const gildedRose = new GildedRose([
      new Item(ITEM_NAMES.BACKSTAGE_PASSES, 6, 1),
    ]);
    gildedRose.updateQuality();
    const added = gildedRose.items[0];
    expect(added.quality).toEqual(3);
    expect(added.sellIn).toEqual(5);
  });

  it("should increase quality of backstage passes by 3 when less than 5 days remaining", () => {
    const gildedRose = new GildedRose([
      new Item(ITEM_NAMES.BACKSTAGE_PASSES, 3, 1),
    ]);
    gildedRose.updateQuality();
    const added = gildedRose.items[0];
    expect(added.quality).toEqual(4);
    expect(added.sellIn).toEqual(2);
  });

  it("should set quality of backstage passes to 0 after concert", () => {
    const gildedRose = new GildedRose([
      new Item(ITEM_NAMES.BACKSTAGE_PASSES, 0, 10),
    ]);
    gildedRose.updateQuality();
    const added = gildedRose.items[0];
    expect(added.quality).toEqual(0);
    expect(added.sellIn).toEqual(-1);
  });

  it("quality should never go above 50", () => {
    const gildedRose = new GildedRose([
      new Item(ITEM_NAMES.BACKSTAGE_PASSES, 2, 50),
    ]);
    gildedRose.updateQuality();
    const added = gildedRose.items[0];
    expect(added.quality).toEqual(50);
    expect(added.sellIn).toEqual(1);
  });
});

describe("sulfuras quality rules", () => {
  it("should not decrease quality for sulfuras", () => {
    const gildedRose = new GildedRose([new Item(ITEM_NAMES.SULFURAS, 1, 80)]);
    gildedRose.updateQuality();
    const added = gildedRose.items[0];
    expect(added.quality).toEqual(80);
    expect(added.sellIn).toEqual(1);
  });
});

describe("conjured item quality rules", () => {
  it("hould update quality 2x as fast as general items for sellIn > 0 days", () => {
    const gildedRose = new GildedRose([
      new Item(ITEM_NAMES.CONJURED, 1, 4),
    ]);
    gildedRose.updateQuality();
    const added = gildedRose.items[0];
    expect(added.quality).toEqual(2);
    expect(added.sellIn).toEqual(0);
  });

  it("should update quality 4x as fast as general items for sellIn < 0 days", () => {
    const gildedRose = new GildedRose([
      new Item(ITEM_NAMES.CONJURED, 0, 8),
    ]);
    gildedRose.updateQuality();
    const added = gildedRose.items[0];
    expect(added.quality).toEqual(4);
    expect(added.sellIn).toEqual(-1);
  });
});

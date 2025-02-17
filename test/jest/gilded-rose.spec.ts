import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {

  it('should initiate gilded rose', () => {
    const gildedRose = new GildedRose();
    const items = gildedRose.updateQuality();
    expect(items.length).toBe(0);
  })

  it('should update quality for foo item', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);

    const items = gildedRose.updateQuality();

    const item = items[0];
    expect(item.name).toBe('foo');
    expect(item.quality).toBe(0);
    expect(item.sellIn).toBe(-1);
  });
});

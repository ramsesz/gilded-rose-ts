import { Item } from "@/gilded-rose";

export class Sulfuras {
  item: Item;

  constructor(item: Item) {
    this.item = item;
  }

  update() {
    return this.item;
  }
}

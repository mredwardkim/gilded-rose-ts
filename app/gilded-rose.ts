export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export const ItemTypes = {
  BRIE: "Aged Brie",
  BSPASS: "Backstage passes to a TAFKAL80ETC concert",
  CONJURED: "Conjured",
  STANDARD: "Standard",
  SULFURAS: "Sulfuras, Hand of Ragnaros",
};

function getUpdatedQuality(item: Item, amount: number) {
  const MIN_QUALITY = 0;
  const MAX_QUALITY = 50;

  return Math.max(MIN_QUALITY, Math.min(MAX_QUALITY, item.quality + amount));
}

function updateStandard(item: Item) {
  item.sellIn--;
  const updateAmount = item.sellIn < 0 ? -2 : -1;
  item.quality = getUpdatedQuality(item, updateAmount);
}

function updateConjured(item: Item) {
  item.sellIn--;
  const updateAmount = item.sellIn < 0 ? -4 : -2;
  item.quality = getUpdatedQuality(item, updateAmount);
}

function updateBrie(item: Item) {
  item.sellIn--;
  const updateAmount = item.sellIn < 0 ? 2 : 1;
  item.quality = getUpdatedQuality(item, updateAmount);
}

function updatePass(item: Item) {
  item.sellIn--;

  if (item.sellIn < 0) {
    item.quality = 0;
  } else if (item.sellIn < 5) {
    item.quality = getUpdatedQuality(item, 3);
  } else if (item.sellIn < 10) {
    item.quality = getUpdatedQuality(item, 2);
  } else {
    item.quality = getUpdatedQuality(item, 1);
  }
}

function updateSulfuras(item: Item) {
  // do nothing
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      switch (item.name) {
        case ItemTypes.BRIE:
          updateBrie(item);
          continue;
        case ItemTypes.BSPASS:
          updatePass(item);
          continue;
        case ItemTypes.CONJURED:
          updateConjured(item);
          continue;
        case ItemTypes.SULFURAS:
          updateSulfuras(item);
          continue;
        default:
          updateStandard(item);
          continue;
      }
    }

    return this.items;
  }
}

export const ItemTypes = {
  BRIE: "Aged Brie",
  PASS: "Backstage passes to a TAFKAL80ETC concert",
  CONJURED: "Conjured",
  STANDARD: "Standard",
  SULFURAS: "Sulfuras, Hand of Ragnaros",
};

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  updateQuality() {
    switch (this.name) {
      case ItemTypes.BRIE:
        this.updateBrie();
        break;
      case ItemTypes.PASS:
        this.updatePass();
        break;
      case ItemTypes.CONJURED:
        this.updateConjured();
        break;
      case ItemTypes.SULFURAS:
        this.updateSulfuras();
        break;
      default:
        this.updateStandard();
    }
  }

  private getUpdatedQuality(amount: number) {
    const MIN_QUALITY = 0;
    const MAX_QUALITY = 50;

    return Math.max(MIN_QUALITY, Math.min(MAX_QUALITY, this.quality + amount));
  }

  private updateStandard() {
    this.sellIn--;
    const updateAmount = this.sellIn < 0 ? -2 : -1;
    this.quality = this.getUpdatedQuality(updateAmount);
  }

  private updateConjured() {
    this.sellIn--;
    const updateAmount = this.sellIn < 0 ? -4 : -2;
    this.quality = this.getUpdatedQuality(updateAmount);
  }

  private updateBrie() {
    this.sellIn--;
    const updateAmount = this.sellIn < 0 ? 2 : 1;
    this.quality = this.getUpdatedQuality(updateAmount);
  }

  private updatePass() {
    this.sellIn--;

    if (this.sellIn < 0) {
      this.quality = 0;
    } else if (this.sellIn < 5) {
      this.quality = this.getUpdatedQuality(3);
    } else if (this.sellIn < 10) {
      this.quality = this.getUpdatedQuality(2);
    } else {
      this.quality = this.getUpdatedQuality(1);
    }
  }

  private updateSulfuras() {
    // do nothing
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      item.updateQuality();
    }

    return this.items;
  }
}

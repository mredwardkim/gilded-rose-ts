import { GildedRose, Item } from "@/gilded-rose";
import { expect } from "chai";

import { ItemTypes } from "@/gilded-rose";
import tests from "../../tests.json";

/*
describe("Generate test permutations", () => {
  const DEFAULT_QUALITY_VALUES = [0, 1, 10, 50];

  // Each testGroup contains a tuple of ItemType, list of SellIn values, list of Quality values,
  const testGroups = [
    [ItemTypes.STANDARD, [-1, 0, 1], DEFAULT_QUALITY_VALUES],
    [ItemTypes.BRIE, [-1, 0, 1], DEFAULT_QUALITY_VALUES],
    [ItemTypes.BSPASS, [-1, 0, 1, 5, 9, 10, 12], DEFAULT_QUALITY_VALUES],
    [ItemTypes.CONJURED, [-1, 0, 1], DEFAULT_QUALITY_VALUES],
    [ItemTypes.SULFURAS, [-1, 0, 1], [80]],
  ];

  const tests: (number | string)[][] = [];

  for (const testGroup of testGroups) {
    const [name, sellInDays, qualityAmounts] = testGroup;
    for (const sellIn of sellInDays) {
      for (const quality of qualityAmounts) {
        const gildedRose = new GildedRose([
          new Item(name as string, sellIn as number, quality as number),
        ]);
        const items = gildedRose.updateQuality();

        const outputSellIn = items[0].sellIn;
        const outputQuality = items[0].quality;

        tests.push([
          name as string,
          sellIn,
          quality,
          outputSellIn,
          outputQuality,
        ]);
      }
    }
  }

  console.log(JSON.stringify(tests));
});
*/

describe("Gilded Rose", () => {
  for (const test of tests) {
    const [name, sellIn, quality, outputSellIn, outputQuality] = test;
    const description = { name, sellIn, quality, outputSellIn, outputQuality };

    it(JSON.stringify(description), () => {
      const gildedRose = new GildedRose([
        new Item(name as string, sellIn as number, quality as number),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(outputSellIn);
      expect(items[0].quality).to.equal(outputQuality);
    });
  }
});

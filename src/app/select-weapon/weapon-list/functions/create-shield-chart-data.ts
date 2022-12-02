import {ArmoryBarChartData} from "../models/armory-bar-chart.model";
import {Shield} from "../models/shield.model";
import {ArmoryItem} from "../models/armory-item.model";

export function createShieldChartData(armoryItem: ArmoryItem): ArmoryBarChartData[] {
  const item = armoryItem as Shield;

  return [
    {
      featureName: 'Price',
      featureValue: item.price,
      featureMaxValue: 40000,
    },
    {
      featureName: 'Level',
      featureValue: item.level,
      featureMaxValue: 3,
    }
  ];
}

import {ArmoryBarChartData} from "../models/armory-bar-chart.model";
import {ArmoryItem} from "../models/armory-item.model";
import {Weapon} from "../models/weapon.model";

export function createWeaponChartData(armoryItem: ArmoryItem): ArmoryBarChartData[] {
  const item = armoryItem as Weapon;

  return [
    {
      featureName: 'Price',
      featureValue: item.price,
      featureMaxValue: 40000,
    },
    {
      featureName: 'Weight',
      featureValue: item.weight,
      featureMaxValue: 100,
    },
    {
      featureName: 'Range',
      featureValue: item.range,
      featureMaxValue: 100,
    },
    {
      featureName: 'Strength',
      featureValue: item.strength,
      featureMaxValue: 100,
    }
  ];
}

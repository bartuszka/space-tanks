import {ArmoryBarChartData} from "../models/armory-bar-chart.model";

export function createUserChartData(): ArmoryBarChartData[] {
  return [
    {
      featureName: 'Attack precision',
      featureValue: 40,
      featureMaxValue: 100,
    },
    {
      featureName: 'Defence effectiveness',
      featureValue: 50,
      featureMaxValue: 100,
    },
    {
      featureName: 'Money management',
      featureValue: 70,
      featureMaxValue: 100,
    },
    {
      featureName: 'Time management',
      featureValue: 80,
      featureMaxValue: 100,
    }
  ];
}

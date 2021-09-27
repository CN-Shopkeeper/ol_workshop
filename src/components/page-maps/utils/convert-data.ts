import WorldMapData from "../data/world.json";
import { ISelectOption } from "../types";

const countryNameList = Object.keys(WorldMapData);

export function convertDataToOption(): ISelectOption[] {
  const optionList: ISelectOption[] = [];
  for (const countryName of countryNameList) {
    optionList.push({ label: countryName, value: countryName });
  }
  return optionList;
}

export function getCountryLocations(countryName: string): number[] {
  return WorldMapData[countryName];
}

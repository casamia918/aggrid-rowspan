import { WithRowSpannedMeta } from "@/automatic-rowspan/types";

export interface IOlympicData {
  id: string;
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

////////////////////////////////////////
// Step1: Define RowData type using WithRowSpannedMeta
////////////////////////////////////////

export type ROlympicData = WithRowSpannedMeta<IOlympicData>;

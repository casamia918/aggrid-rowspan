import _ from "lodash";

import { IOlympicData } from "./types";

export async function fetchOlympicData(
  maxCount: number = Number.MAX_SAFE_INTEGER
) {
  const data1 = await fetch(
    "https://www.ag-grid.com/example-assets/olympic-winners.json"
  );

  const data2 = await data1.json();

  const data3 = _.chain(data2)
    .filter((d, idx) => {
      return idx < maxCount;
    })
    .sortBy(["country", "athlete", "sport", "year"])
    .map((d, idx) => ({ ...d, id: String(idx + 1) })) // id should be assigned after sort
    .value() as IOlympicData[];

  console.log(data3);

  return data3;
}

import _ from "lodash";

import { IOlympicData } from "../types";

export async function fetchOlympicData(
  maxCount: number = Number.MAX_SAFE_INTEGER
) {
  const data = await fetch(
    "https://www.ag-grid.com/example-assets/olympic-winners.json"
  ).then((d) => d.json());

  const data2 = _.chain(data)
    .filter((d, idx) => {
      return idx < maxCount;
    })
    .sortBy(["country", "athlete", "sport", "year"])
    .map((d, idx) => ({ ...d, id: String(idx + 1) })) // id should be assigned after sort
    .value() as IOlympicData[];

  console.log(data2);

  return data2;
}

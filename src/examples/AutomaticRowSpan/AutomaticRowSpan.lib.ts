import {
  ColDef,
  GridApiSet,
  CellClassRules,
  GridReadyEvent,
  RowSpanParams,
  GetRowSpanGroupIdParams,
} from "ag-grid-community";

import {
  WithRowSpannedMeta,
  getColDef_RowSpan,
  useRowSpannedRowData,
} from "@/automatic-rowspan";

import { IOlympicData, ROlympicData } from "../types";

function joinIds(...ids: (string | undefined)[]) {
  return ids.map((id) => id ?? "").join("__");
}

////////////////////////////////////////
// Step2: (Important) Define getRowSpanGroupId functions by each row spannable columns
////////////////////////////////////////
export const getRowSpanGroupId = {
  country(params: GetRowSpanGroupIdParams<ROlympicData>) {
    return params.data?.country ?? "";
  },
  athlete(params: GetRowSpanGroupIdParams<ROlympicData>) {
    return joinIds(this.country(params), params.data?.athlete);
  },
  sport(params: GetRowSpanGroupIdParams<ROlympicData>) {
    return joinIds(this.athlete(params), params.data?.sport);
  },
};

export function getRowDataId(data: IOlympicData) {
  return data.id;
}

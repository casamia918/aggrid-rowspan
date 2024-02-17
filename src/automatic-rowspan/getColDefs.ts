import { ColDef } from "ag-grid-community";
import { WithRowSpannedMeta } from "./types";
import * as Util from "./utils";

export function getColDef_RowSpan<
  TData extends object = object,
  TValue = any,
  RData extends WithRowSpannedMeta<TData> = WithRowSpannedMeta<TData>
>(
  override: ColDef<RData, TValue> & Required<Pick<ColDef, "getRowSpanGroupId">>
): ColDef<RData, TValue> {
  const field = override.field ?? override.colId;

  if (!field) {
    throw new Error(`[getColDef_RowSpan] field is required`);
  }

  return {
    rowSpan: (params) => {
      return Util.getRowSpanCount(params.data, field);
    },
    ...override,
    cellClassRules: {
      "cell-span-head": (params) => {
        const field = params.column.getColId();
        return Util.checkIfHeadCell(params.data!, field, params.node.id!);
      },
      "cell-span-leaf": (params) => {
        const field = params.column.getColId();
        return !Util.getMetaOfField(params.data!, field)?.leafIds;
      },
      ...override.cellClassRules,
    },
  };
}

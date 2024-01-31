import { ColDef } from "ag-grid-community";

export function getColDef_RowSpan<TData = any, TValue = any>(
  override: ColDef<TData, TValue> & Required<Pick<ColDef, "getRowSpanGroupId">>
): ColDef<TData, TValue> {
  return {
    rowSpan: (params) => {
      // TODO: if head ? rowSpanGroup.count : 1;
      return 1;
    },
    ...override,
    cellClassRules: {
      "cell-span": (params) => {
        // TODO: if head ? true : false;
        return true;
      },
      ...override.cellClassRules,
    },
  };
}

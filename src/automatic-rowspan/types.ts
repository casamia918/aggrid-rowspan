import {
  AbstractColDef,
  BaseColDefOptionalDataParams,
} from "ag-grid-community/dist/lib/entities/colDef";

declare module "ag-grid-community" {
  interface GetRowSpanGroupIdParams<TData = any, TValue = any>
    extends BaseColDefOptionalDataParams<TData, TValue> {}

  interface ColDef<TData = any, TValue = any>
    extends AbstractColDef<TData, TValue> {
    getRowSpanGroupId?: (
      params: GetRowSpanGroupIdParams<TData, TValue>
    ) => string;
  }
}

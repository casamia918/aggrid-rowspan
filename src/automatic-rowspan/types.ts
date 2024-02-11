import { Column, ColumnApi, GridApi } from "ag-grid-community";
import {
  AbstractColDef,
  BaseColDefOptionalDataParams,
} from "ag-grid-community/dist/lib/entities/colDef";

declare module "ag-grid-community" {
  interface GetRowSpanGroupIdParams<TData extends object, TValue = any> {
    /** Data associated with the node */
    data: TData | undefined;
    /** Column for this callback */
    column: Column<TValue>;
    /** ColDef provided for this column */
    colDef: ColDef<TData, TValue>;

    // rowNode is not allowed

    /** The grid api. */
    api: GridApi<TData>;
    /** @deprecated v31 ColumnApi has been deprecated and all methods moved to the api. */
    columnApi: ColumnApi;
    /** Application context as set on `gridOptions.context`. */
    context: any;
  }

  interface ColDef<TData extends object, TValue = any>
    extends AbstractColDef<TData, TValue> {
    getRowSpanGroupId?: (
      params: GetRowSpanGroupIdParams<TData, TValue>
    ) => string;
  }

  interface GridApiSet<TData extends object> {
    /** The grid api. */
    api: GridApi<TData>;

    /** @deprecated */
    columnApi: ColumnApi;
  }
}

export type RowSpanMeta = {
  headId: string;
  leafIds: string[] | undefined;
};

export const META_FIELD = "__meta__";

export type WithRowSpannedMeta<Data extends object = object> = Data & {
  [META_FIELD]: Partial<Record<string & keyof Data, RowSpanMeta>>;
};

interface TestData {
  a: number;
  b: string;
}

const t: TestData = {
  a: 1,
  b: "sdf",
};

const t2: WithRowSpannedMeta<TestData> = {
  a: 1,
  b: "sdf",
  __meta__: {
    a: {
      headId: "sdf",
      leafIds: [],
    },
  },
};

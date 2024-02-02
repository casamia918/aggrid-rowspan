import {
  AbstractColDef,
  BaseColDefOptionalDataParams,
} from "ag-grid-community/dist/lib/entities/colDef";

declare module "ag-grid-community" {
  interface GetRowSpanGroupIdParams<TData extends object, TValue = any>
    extends BaseColDefOptionalDataParams<TData, TValue> {}

  interface ColDef<TData extends object, TValue = any>
    extends AbstractColDef<TData, TValue> {
    getRowSpanGroupId?: (
      params: GetRowSpanGroupIdParams<TData, TValue>
    ) => string;
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

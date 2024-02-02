import _ from "lodash";

import { GetRowIdFunc, GetRowIdParams } from "ag-grid-community";

import { META_FIELD, RowSpanMeta, WithRowSpannedMeta } from "./types";

export function getMetaOfField<
  TData extends object = object,
  Field extends string = keyof TData & string
>(data: WithRowSpannedMeta<TData>, field: Field): RowSpanMeta {
  const foundMeta = _.get(
    data,
    [META_FIELD, field] as [typeof META_FIELD, Field],
    undefined
  ) as RowSpanMeta | undefined;

  if (!foundMeta) {
    throw new Error(
      `[RowSpanUtil] RowSpanMeta is not existed of field: ${field}, in data: ${data}`
    );
  }

  return foundMeta;
}

export function checkIfHeadcellOfMeta(meta: RowSpanMeta, rowId: string) {
  return meta.headId === rowId;
}

export function chedkIfHeadCell<
  TData extends object = object,
  Field extends string = keyof TData & string
>(data: WithRowSpannedMeta<TData>, field: Field, rowId: string) {
  const meta = getMetaOfField(data, field);

  return checkIfHeadcellOfMeta(meta, rowId);
}

export function getRowSpanCount<
  TData extends object = object,
  Field extends string = keyof TData & string
>(data: WithRowSpannedMeta<TData> | undefined, field: Field) {
  if (!data) return 1;

  const meta = getMetaOfField(data, field);

  // NOTE: leafCell don't have meta.leafIds
  return (meta.leafIds?.length ?? 0) + 1;
}

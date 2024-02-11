import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useDeferredValue,
} from "react";
import _ from "lodash";

import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import { META_FIELD, RowSpanMeta, WithRowSpannedMeta } from "./types";
import * as util from "./utils";
import { IOlympicData } from "@/examples/types";

/**
 * make new rowData with row span related meta field attached
 */
export function useRowSpannedRowData<TData extends object>(
  rowData: TData[],
  _columnDefs: ColDef<WithRowSpannedMeta<TData>>[],
  _gridRef: React.MutableRefObject<AgGridReact<
    WithRowSpannedMeta<TData>
  > | null>,
  getRowDataId: (data: TData) => string
) {
  type RData = WithRowSpannedMeta<TData>;

  // Casting RData to TData is required to avoid type error
  const columnDefs = _columnDefs as ColDef<TData>[];
  const gridRef = _gridRef as React.MutableRefObject<AgGridReact<TData> | null>;

  const _rowSpannedRowData = useMemo<RData[]>(() => {
    const api = gridRef.current?.api;
    const columnApi = gridRef.current?.columnApi;

    if (!api || !columnApi) return [];

    const tempRowData: RData[] = rowData.map((data) => {
      return <RData>{
        ...data,
        [META_FIELD]: {},
      };
    });

    columnDefs.forEach((colDef) => {
      const {
        getRowSpanGroupId,
        field: __field,
        colId: __colId,
        ...rest
      } = colDef;

      const colId = __field || __colId;

      if (!colId) return;
      if (!getRowSpanGroupId) return;

      const column = api.getColumn(colId);

      if (!column) throw new Error("[useRowSpannedRowData] invalid column id");

      const getRowSpanGroupIdOfData = (data: TData) => {
        return getRowSpanGroupId({
          api,
          columnApi,
          colDef,
          column,
          context: gridRef.current?.context,
          data,
        });
      };

      // key: rowSpanGroupId, value: rowSpanMeta
      const savedRowSpanGroupMap = new Map<string, RowSpanMeta>();

      for (let i = 0; i < tempRowData.length; i++) {
        const currData = tempRowData[i];
        const currSpanGroupId = getRowSpanGroupIdOfData(currData);
        const currRowId = getRowDataId(currData);

        const foundGroup = savedRowSpanGroupMap.get(currSpanGroupId);
        if (foundGroup) {
          foundGroup.leafIds?.push(currRowId);
        } else {
          savedRowSpanGroupMap.set(currSpanGroupId, {
            headId: currRowId,
            leafIds: [],
          });
        }
      }

      for (let i = 0; i < tempRowData.length; i++) {
        const currData = tempRowData[i];
        const currSpanGroupId = getRowSpanGroupIdOfData(currData);
        const currRowId = getRowDataId(currData);

        const foundGroup = savedRowSpanGroupMap.get(currSpanGroupId);
        if (!foundGroup) {
          throw new Error(
            "[useRowSpannedRowData] RowSpanGroup should be exist"
          );
        }

        if (util.checkIfHeadcellOfMeta(foundGroup, currRowId)) {
          _.set(currData, [META_FIELD, colId, "headId"], foundGroup.headId);
          _.set(currData, [META_FIELD, colId, "leafIds"], foundGroup.leafIds);
        } else {
          _.set(currData, [META_FIELD, colId, "headId"], foundGroup.headId);
          _.set(currData, [META_FIELD, colId, "leafIds"], undefined);
        }
      }
    });

    return tempRowData;
  }, [
    rowData,
    columnDefs,
    gridRef.current?.api,
    gridRef.current?.columnApi,
    gridRef.current?.context,
  ]);

  // _rowSpannedRowData is heavy memoid value
  const rowSpannedRowData = useDeferredValue(_rowSpannedRowData);

  return { rowSpannedRowData };
}

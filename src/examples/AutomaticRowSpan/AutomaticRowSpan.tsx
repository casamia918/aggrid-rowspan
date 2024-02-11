"use strict";

import React, {
  StrictMode,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";

import { AgGridReact } from "ag-grid-react";
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

import { useOlympicData } from "../hook.useOlympicData";

import { IOlympicData, ROlympicData } from "../types";

import { getRowSpanGroupId, getRowDataId } from "./AutomaticRowSpan.lib";

export const AutomaticRowSpanExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const { rowData, setRowData } = useOlympicData();

  const gridRef = useRef<AgGridReact<ROlympicData> | null>(null);

  ////////////////////////////////////////
  // Step3: call getColDef_RowSpan to make colDef
  ////////////////////////////////////////
  const [columnDefs, setColumnDefs] = useState<ColDef<ROlympicData>[]>([
    { field: "id", width: 80 },
    getColDef_RowSpan({
      field: "country",
      getRowSpanGroupId: getRowSpanGroupId.country.bind(getRowSpanGroupId),
      width: 170,
    }),
    getColDef_RowSpan({
      field: "athlete",
      getRowSpanGroupId: getRowSpanGroupId.athlete.bind(getRowSpanGroupId),
      width: 200,
    }),
    getColDef_RowSpan({
      field: "sport",
      getRowSpanGroupId: getRowSpanGroupId.sport.bind(getRowSpanGroupId),
    }),
    { field: "age", width: 100 },
    { field: "year", width: 100 },
    { field: "date" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ]);

  ////////////////////////////////////////
  // Step4: call useRowSpannedRowData
  ////////////////////////////////////////
  const { rowSpannedRowData } = useRowSpannedRowData(
    rowData,
    columnDefs,
    gridRef,
    getRowDataId
  );

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      width: 170,
      sortable: false, // limitations
    };
  }, []);

  console.log("rowSpannedRowData", rowSpannedRowData);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className={"ag-theme-quartz"}>
        <AgGridReact<ROlympicData>
          ref={gridRef}
          rowData={rowSpannedRowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          suppressRowTransform={true}
          getRowId={(params) => getRowDataId(params.data)}
          enableRangeSelection // CAUTION: aggrid enterprise feature
          // CAUTION: Due to row virtualization, when row group length is larget than
          // number of rows in screen
          // rowGroup is not showing
          //
          // suppressRowVirtualisation
          // suppressMaxRenderedRowRestriction
        />
      </div>
    </div>
  );
};

"use strict";

import React, { StrictMode, useCallback, useMemo, useState } from "react";
import {
  CellClassRules,
  ColDef,
  GridReadyEvent,
  RowSpanParams,
  GetRowSpanGroupIdParams,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import {
  getColDef_RowSpan,
  WithRowSpannedMeta,
  useRowSpannedRowData,
} from "@/automatic-rowspan";

import { IOlympicData } from "../types";
import { useOlympicData } from "../hook.useOlympicData";

import "../style.css";

////////////////////////////////////////
// Step1: Define RowData type using WithRowSpannedMeta
////////////////////////////////////////
type ROlympicData = WithRowSpannedMeta<IOlympicData>;

function joinIds(...ids: (string | undefined)[]) {
  return ids.map((id) => id ?? "").join("__");
}

////////////////////////////////////////
// Step2: Define getRowSpanGroupId functions by each row spannable columns
////////////////////////////////////////
const getRowSpanGroupId = {
  country(params: GetRowSpanGroupIdParams<ROlympicData>) {
    return joinIds(params.data?.country);
  },
  athlete(params: GetRowSpanGroupIdParams<ROlympicData>) {
    return joinIds(this.country(params), params.data?.athlete);
  },
  sport(params: GetRowSpanGroupIdParams<ROlympicData>) {
    return joinIds(this.athlete(params), params.data?.sport);
  },
};

export const AutomaticRowSpanExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const { rowData, setRowData } = useOlympicData();

  ////////////////////////////////////////
  // Step3: call useRowSpannedRowData
  ////////////////////////////////////////
  const { rowSpannedRowData } = useRowSpannedRowData(rowData);

  ////////////////////////////////////////
  // Step4: call getColDef_RowSpan to make colDef
  ////////////////////////////////////////
  const [columnDefs, setColumnDefs] = useState<ColDef<ROlympicData>[]>([
    { field: "id", width: 80 },
    getColDef_RowSpan({
      field: "country",
      getRowSpanGroupId: getRowSpanGroupId.country,
      width: 170,
    }),
    getColDef_RowSpan({
      field: "athlete",
      getRowSpanGroupId: getRowSpanGroupId.athlete,
      width: 200,
    }),
    getColDef_RowSpan({
      field: "sport",
      getRowSpanGroupId: getRowSpanGroupId.sport,
    }),
    { field: "age", width: 100 },
    { field: "year", width: 100 },
    { field: "date" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ]);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      width: 170,
      sortable: false, // limitations
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className={"ag-theme-quartz"}>
        <AgGridReact<ROlympicData>
          rowData={rowSpannedRowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          suppressRowTransform={true}
          getRowId={(d) => d.data.id}
          enableRangeSelection // CAUTION: aggrid enterprise feature
        />
      </div>
    </div>
  );
};

"use strict";

import React, { StrictMode, useCallback, useMemo, useState } from "react";
import {
  CellClassRules,
  ColDef,
  GridReadyEvent,
  RowSpanParams,
  GetRowSpanGroupIdParams,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";

import { getColDef_RowSpan } from "@/automatic-rowspan";

import { IOlympicData } from "./types";
import "./AutomaticRowSpan.css";

const getRowSpanGroupId = {
  athlete(params: GetRowSpanGroupIdParams<IOlympicData>) {
    return params.data?.athlete ?? "";
  },
  sport(params: GetRowSpanGroupIdParams<IOlympicData>) {
    return this.athlete(params) + "__" + params.data?.sport ?? "";
  },
};

export const AutomaticRowSpanExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState<IOlympicData[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "country" },
    getColDef_RowSpan({
      field: "athlete",
      getRowSpanGroupId: getRowSpanGroupId.athlete,
      width: 200,
    }),
    { field: "age", width: 100 },
    { field: "year", width: 100 },
    { field: "date" },
    getColDef_RowSpan({
      field: "sport",
      getRowSpanGroupId: getRowSpanGroupId.athlete,
    }),
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      width: 170,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data: IOlympicData[]) => setRowData(data));
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className={"ag-theme-quartz"}>
        <AgGridReact<IOlympicData>
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          suppressRowTransform={true}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
};

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

import { getColDef_RowSpan } from "@/automatic-rowspan";

import { IOlympicData } from "../types";
import { useOlympicData } from "../hook.useOlympicData";

import "../style.css";

function joinIds(...ids: (string | undefined)[]) {
  return ids.map((id) => id ?? "").join("__");
}

const getRowSpanGroupId = {
  athlete(params: GetRowSpanGroupIdParams<IOlympicData>) {
    return joinIds(params.data?.country, params.data?.athlete);
  },
  sport(params: GetRowSpanGroupIdParams<IOlympicData>) {
    return joinIds(this.athlete(params), params.data?.sport);
  },
};

export const AutomaticRowSpanExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const { rowData, setRowData } = useOlympicData();

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
      sortable: false, // limitations
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className={"ag-theme-quartz"}>
        <AgGridReact<IOlympicData>
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          suppressRowTransform={true}
          getRowId={(d) => d.data.id}
        />
      </div>
    </div>
  );
};

"use strict";

import React, { StrictMode, useCallback, useMemo, useState } from "react";
import { ColDef, GridReadyEvent, RowSpanParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { IOlympicData } from "./types";
import "./OriginalRowSpanExample.styles.css";

function rowSpan(params: RowSpanParams<IOlympicData>) {
  const athlete = params.data ? params.data.athlete : undefined;
  if (athlete === "Aleksey Nemov") {
    // have all Russia age columns width 2
    return 2;
  } else if (athlete === "Ryan Lochte") {
    // have all United States column width 4
    return 4;
  } else {
    // all other rows should be just normal
    return 1;
  }
}

export const OriginalRowSpanExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState<IOlympicData[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "country" },
    {
      field: "athlete",
      rowSpan: rowSpan,
      cellClassRules: {
        "cell-span": "value==='Aleksey Nemov' || value==='Ryan Lochte'",
      },
      width: 200,
    },
    { field: "age", width: 100 },
    { field: "year", width: 100 },
    { field: "date" },
    { field: "sport" },
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

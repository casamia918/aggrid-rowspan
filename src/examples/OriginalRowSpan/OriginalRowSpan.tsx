"use strict";

import _ from "lodash";

import React, { StrictMode, useCallback, useMemo, useState } from "react";

import { ColDef, GridReadyEvent, RowSpanParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import { IOlympicData } from "../types";
import { useOlympicData } from "../hook.useOlympicData";

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
  const { rowData, setRowData } = useOlympicData();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "id", width: 80 },
    { field: "country" },
    {
      field: "athlete",
      rowSpan: rowSpan,
      cellClassRules: {
        "cell-span-original": "value==='Aleksey Nemov' || value==='Ryan Lochte'",
      },
      width: 200,
    },
    { field: "sport" },
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
        <AgGridReact<IOlympicData>
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          suppressRowTransform={true}
          getRowId={(d) => d.data.id}
          enableRangeSelection // CAUTION: aggrid enterprise feature
          rowSelection="multiple"
        />
      </div>
    </div>
  );
};

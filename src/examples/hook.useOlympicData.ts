import React, { useState, useEffect } from "react";
import _ from "lodash";

import { IOlympicData } from "./types";
import { fetchOlympicData } from "./util.fetchOlympicData";

export function useOlympicData() {
  const [rowData, setRowData] = useState<IOlympicData[]>([]);

  useEffect(() => {
    const maxCountStr = new URLSearchParams(window.location.search).get(
      "count"
    );
    const maxCount = maxCountStr ? _.toSafeInteger(maxCountStr) : undefined;
    fetchOlympicData(maxCount).then(setRowData);
  }, []);

  return { rowData, setRowData };
}

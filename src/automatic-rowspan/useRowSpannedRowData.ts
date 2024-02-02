import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useDeferredValue,
} from "react";

import { WithRowSpannedMeta } from "./types";
import { IOlympicData } from "@/examples/types";

export function useRowSpannedRowData<TData extends object>(rowData: TData[]) {
  const _rowSpannedRowData = useMemo<WithRowSpannedMeta<TData>[]>(() => {
    return [];
  }, [rowData]);

  const rowSpannedRowData = useDeferredValue(_rowSpannedRowData);

  return { rowSpannedRowData };
}

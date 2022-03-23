import { PropsWithChildren } from "react";

export interface SelectedDataProps {
  iden?: string;
  timeRanges?: string[][];
  times?: string[];
  dayName?: string;
}

export interface ReactWeekTimeRangePickerProps extends PropsWithChildren<{}> {
  hasHalfHour?: boolean;
  selectedData?: SelectedDataProps[];
  selectTimeRange?: (checked: SelectedDataProps[]) => void;
  outerCellColor?: string;
  innerCellColor?: string;
  fontColor?: string;
  summaryColor: string;
}

export interface DragProps {
  type: string;
  clientX?: number;
  clientY?: number;
  layerX?: number;
  layerY?: number;
  iden?: string;
  hour?: string;
  value?: string;
  isDrag?: boolean;
}

export interface TheadProps extends PropsWithChildren<{}> {
  hasHalfHour: boolean;
  outerCellColor?: string;
  fontColor?: string;
}

export interface TbodyProps extends PropsWithChildren<{}> {
  hasHalfHour: boolean;
  checkedDatas?: SelectedDataProps[];
  handleDrag: (props: DragProps) => void;
  handleSelect: (selected: SelectedDataProps[]) => void;
  handleMoveOut: (isOut: boolean) => void;
  outerCellColor?: string;
  innerCellColor?: string;
  summaryColor?: string;
  fontColor?: string;
}

export interface SelectedProps extends PropsWithChildren<{}> {
  hasHalfHour: boolean;
  checkedDatas?: SelectedDataProps[];
  handleEmpty: () => void;
  summaryColor?: string;
  fontColor?: string;
}

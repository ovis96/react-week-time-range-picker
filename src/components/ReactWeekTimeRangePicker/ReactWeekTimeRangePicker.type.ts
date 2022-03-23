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
}

export interface TbodyProps extends PropsWithChildren<{}> {
  hasHalfHour: boolean;
  checkedDatas?: SelectedDataProps[];
  handleDrag: (props: DragProps) => void;
  handleSelect: (selected: SelectedDataProps[]) => void;
  handleMoveOut: (isOut: boolean) => void;
}

export interface SelectedProps extends PropsWithChildren<{}> {
  hasHalfHour: boolean;
  checkedDatas?: SelectedDataProps[];
  handleEmpty: () => void;
}

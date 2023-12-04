import React, { PropsWithChildren } from 'react';

interface SelectedDataProps {
    iden?: string;
    timeRanges?: string[][];
    times?: string[];
    dayName?: string;
}
interface ReactWeekTimeRangePickerProps extends PropsWithChildren<{}> {
    hasHalfHour?: boolean;
    selectedData?: SelectedDataProps[];
    selectTimeRange?: (checked: SelectedDataProps[]) => void;
    outerCellColor?: string;
    innerCellColor?: string;
    fontColor?: string;
    summaryColor?: string;
}

declare const ReactWeekTimeRangePicker: React.FunctionComponent<ReactWeekTimeRangePickerProps>;

export { ReactWeekTimeRangePicker };

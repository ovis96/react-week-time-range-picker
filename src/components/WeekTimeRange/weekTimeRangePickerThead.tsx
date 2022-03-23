import React from "react";
import {
  theadFirstTd,
  theadWithHalfHours,
  theadWithHours,
} from "../../config/thead.js";
import { TheadProps } from "../ReactWeekTimeRangePicker/ReactWeekTimeRangePicker.type";

const WeekTimeRangePickerThead: React.FunctionComponent<TheadProps> = (
  props: TheadProps
) => {
  const hours = props.hasHalfHour ? theadWithHalfHours : theadWithHours;
  const colspan = props.hasHalfHour ? 1 : 2;
  return (
    <thead>
      <tr>
        <th rowSpan={8} className="week-td">
          {theadFirstTd}
        </th>
        {hours.map((item, i) => {
          return (
            <td colSpan={colspan} key={i}>
              {item.time}
            </td>
          );
        })}
      </tr>
    </thead>
  );
};

export default WeekTimeRangePickerThead;

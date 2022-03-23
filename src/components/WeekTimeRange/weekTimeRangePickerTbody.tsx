import React, { useState, useEffect } from "react";
import { theadWithHalfHours, theadWithHours } from "../../config/thead.js";
import { days } from "../../config/tbody.js";
import {
  sort,
  sortHour,
  handleRange,
  handleDayRange,
  handleCheckedData,
} from "../../util/index";
import "../../less/time-range-picker-tbody.less";
import WeekTimeRangeSelected from "./weekTimeRangeSelected";
import {
  TbodyProps,
  SelectedDataProps,
} from "../ReactWeekTimeRangePicker/ReactWeekTimeRangePicker.type.js";

let hasStart = false; // Determine whether the starting point is in cacheChecked when mousedown
let isDrag = false;
let cach = {
  cacheStart: {
    // Cache the start time data of mousedown
    iden: "",
    hour: "",
    group: "",
  },
  cacheEnd: {
    // Cache mouseup endpoint time data
    iden: "",
    hour: "",
    group: "",
  },
};

const WeekTimeRangePickerTbody: React.FunctionComponent<TbodyProps> = (
  props: TbodyProps
) => {
  const [checkedDatas, setCheckedDatas] = useState<SelectedDataProps[]>(
    props.checkedDatas
  );

  useEffect(() => {
    document.body.addEventListener("mouseup", handleBodyMouseUp);
    return () =>
      document.body.removeEventListener("mouseup", handleBodyMouseUp);
  });

  const { hasHalfHour, handleDrag, handleSelect, handleMoveOut, fontColor } =
    props;
  const hours = hasHalfHour ? theadWithHalfHours : theadWithHours;
  const colspan = hasHalfHour ? 1 : 2;

  const handleBodyMouseUp = (e) => {
    if (e && !e.target.dataset.hour) {
      isDrag = false;
    }
  };

  /**
   * @desc Record the corresponding start time data when the mousedown event occurs
   *         The headline is selected or unselected according to the starting point, so you should first judge whether the starting point is selected or not.
   *         If yes, uncheck all the times within the frame selection range, otherwise check all.
   */
  const handleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    isDrag = true;
    if (handleSetVal(e, "cacheStart")) {
      const dragData = {
        type: "down",
        clientX: e.clientX,
        clientY: e.clientY,
        layerX: e.nativeEvent.layerX,
        layerY: e.nativeEvent.layerY,
        iden: cach.cacheStart.iden,
        hour: cach.cacheStart.hour,
      };
      handleDrag(dragData);
    }
    isHasStart(cach.cacheStart.iden, cach.cacheStart.hour);
  };

  /**
   * @desc When the mouseup event occurs, the corresponding end time data is recorded, and the selected time range is calculated at the same time.
   */
  const handleMouseUp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    isDrag = false;
    handleSetVal(e, "cacheEnd");
    clearCache("cacheStart");
    clearCache("cacheEnd");
    handleDrag({ type: "up" });
    handleSelect(checkedDatas);
  };

  const handleMouseMove = (e) => {
    if (!e.target.dataset.hour) {
      return;
    }
    handleMoveOut(false);
    const dragData = {
      type: "move",
      clientX: e.clientX,
      clientY: e.clientY,
      layerX: e.nativeEvent.layerX,
      layerY: e.nativeEvent.layerY,
      iden: e.target.dataset.iden,
      hour: e.target.dataset.hour,
      value: e.target.dataset.value,
      isDrag: isDrag,
    };
    handleDrag(dragData);
  };
  /**
   * @desc Process data in/out of cacheChecked.
   * 1. It is necessary to judge whether the hour already exists on the date in cacheChecked, if not, add it, otherwise delete it
   * 2. It is necessary to judge whether the iden already exists in cacheChecked. If it does not need to be added, if it exists but all the hours in the iden are unchecked, delete the iden
   */
  const handleData = (iden, hour) => {
    let cacheChecked = checkedDatas;
    const { has, idenIndex, index } = isHasStart(iden, hour);
    if (!has) {
      cacheChecked.push({
        iden: iden,
        times: [hour],
      });
      setCheckedDatas([...cacheChecked]); // Big pit, re-create an array reference
      return;
    }
    if (!hasStart) {
      cacheChecked[idenIndex].times.push(hour);
      setCheckedDatas([...cacheChecked]);
      return;
    }
    const exist = cacheChecked[idenIndex].times.length === 1;
    exist
      ? cacheChecked.splice(idenIndex, 1)
      : cacheChecked[idenIndex].times.splice(index, 1);
    setCheckedDatas([...cacheChecked]);
  };

  /**
   * @desc When the event is triggered, extract the same assignment code
   */
  const handleSetVal = (e, key) => {
    if (e.target.dataset.hour) {
      let iden = e.target.dataset.iden,
        hour = e.target.dataset.hour;
      cach[key].iden = iden;
      cach[key].hour = hour;
      cach[key].group = iden + hour;
      key === "cacheStart" && isHasStart(iden, hour);
      key === "cacheEnd" &&
        cach[key].group === cach.cacheStart.group &&
        handleData(iden, hour);
      key === "cacheEnd" &&
        cach[key].group !== cach.cacheStart.group &&
        confirmRange();
      return true;
    }
    return false;
  };

  // Clear the cache's cacheStart and cacheEnd
  const clearCache = (key) => {
    cach[key].iden = "";
    cach[key].hour = "";
    cach[key].group = "";
  };

  // Clear all data
  const handleEmpty = () => {
    hasStart = false;
    clearCache("cacheStart");
    clearCache("cacheEnd");
    setCheckedDatas([]);
  };

  /**
   * @desc In view of the fact that both click and mousedown need to traverse the array to determine whether the current time already exists, so extract the common code
   * Returned value:
   * has: determine whether the iden exists in cacheChecked, that is, a certain day from Monday to Sunday
   * idenIndex: The iden is indexed in cacheChecked,
   * index: the next hour in the corresponding date in cacheChecked
   */
  const isHasStart = (iden, hour?: string) => {
    hasStart = false;
    let cacheChecked = checkedDatas,
      l = cacheChecked.length,
      has = false,
      index,
      idenIndex;
    for (let i = 0; i < l; i++) {
      if (cacheChecked[i].iden === iden) {
        idenIndex = i;
        index = cacheChecked[i].times.indexOf(hour);
        has = true;
        hasStart = index !== -1;
        break;
      }
    }
    return { has, idenIndex, index };
  };

  /**
   * @desc Determine the time range according to cacheStart and cacheEnd, modify cacheChecked
   * hasStart false The time within the box selection range to do the selection operation
   * Uncheck the time within the true box selection range
   */
  const confirmRange = () => {
    let daysArr = [cach.cacheStart.iden, cach.cacheEnd.iden],
      hoursArr = [cach.cacheStart.hour, cach.cacheEnd.hour],
      tempHasStart = hasStart,
      cacheChecked = JSON.parse(JSON.stringify(checkedDatas));
    daysArr.sort(sort);
    hoursArr.sort(sortHour);
    const dayRange = handleDayRange(daysArr);
    const timeRange = handleRange(hasHalfHour, hoursArr); // The time range of the box selection
    for (let day of dayRange) {
      let { has, idenIndex } = isHasStart(day);
      handleCheckedData({
        cacheChecked,
        hasStart: tempHasStart,
        has,
        idenIndex,
        iden: day,
        timeRange,
      });
    }
    setCheckedDatas(cacheChecked);
  };

  return (
    <tbody
      className="wtrp-tbody"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {days.map((item, i) => {
        return (
          <tr className="wtrp-tbody-tr" key={i}>
            <td
              className="week-td"
              style={{
                backgroundColor: props.outerCellColor,
                color: fontColor,
              }}
            >
              {item.dayName}
            </td>
            {hours.map((hour, index) => {
              const isActive = checkedDatas.some((checked) => {
                return (
                  checked.iden === item.iden &&
                  checked.times.indexOf(hour.time) !== -1
                );
              });
              return (
                <td
                  colSpan={colspan}
                  style={
                    isActive ? null : { backgroundColor: props.innerCellColor }
                  }
                  className={isActive ? "wtrp-active-td" : "wtrp-freeze-td"}
                  key={index}
                  data-hour={hour.time}
                  data-iden={item.iden}
                  data-value={`${item.dayName} ${hour.time}`}
                />
              );
            })}
          </tr>
        );
      })}
      <WeekTimeRangeSelected
        hasHalfHour={hasHalfHour}
        checkedDatas={checkedDatas}
        handleEmpty={handleEmpty}
        summaryColor={props.summaryColor}
        fontColor={props.fontColor}
      />
    </tbody>
  );
};

export default WeekTimeRangePickerTbody;

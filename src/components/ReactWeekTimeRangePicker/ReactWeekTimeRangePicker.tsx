import React, { useState, useEffect } from "react";
import {
  ReactWeekTimeRangePickerProps,
  SelectedDataProps,
  DragProps,
} from "./ReactWeekTimeRangePicker.type";
import "../../less/base.less";
import "../../less/index.less";
import "../../less/time-range-picker-common.less";
import WeekTimeRangePickerTbody from "../WeekTimeRange/weekTimeRangePickerTbody";
import WeekTimeRangePickerThead from "../WeekTimeRange/weekTimeRangePickerThead";

let isFocus = false; // Determine whether the focus is obtained by clicking
let isMoveout = false; // Determine whether to move out of the time selection range
let startX = 0; // record starting point when clicked.clientX
let startY = 0; // record starting point when clicked.clientY
let startLayerX = 0; // Record the distance from the upper left corner of the td corresponding to the starting point to the x-axis of the table
let startLayerY = 0; // The distance from the upper left corner of the record starting point to the upper left corner of the td and the y-axis of the table
let topY = 0; // Record the vertical deviation of the boundary when the starting point is clicked
let leftX = 0; // record starting point when layerX is clicked - The distance from the left side of the td to the left side of the table

const ReactWeekTimeRangePicker: React.FunctionComponent<ReactWeekTimeRangePickerProps> =
  (props: ReactWeekTimeRangePickerProps) => {
    const [isDrag, setIsDrag] = useState(false); // Control drag frame development
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [cacheChecked, setCacheChecked] = useState<SelectedDataProps[]>(
      props.selectedData || []
    ); // Cache selected time data

    useEffect(() => {
      document.body.addEventListener("mouseup", handleMouseUp);
      document.body.addEventListener("mousemove", handleMouseMove);
      return () => {
        document.body.removeEventListener("mouseup", handleMouseUp);
        document.body.removeEventListener("mousemove", handleMouseMove);
      };
    });

    const {
      selectTimeRange,
      outerCellColor,
      innerCellColor,
      fontColor,
      summaryColor,
      hasHalfHour = false,
    } = props;

    // Get the selected data and throw it to the parent component
    const handleSelect = (selected: SelectedDataProps[]) => {
      setCacheChecked(selected);
      selectTimeRange && selectTimeRange(selected);
    };

    // Release after dragging exceeds the table range
    const handleMouseUp = (e) => {
      if (e && !e.target.dataset.hour) {
        setIsDrag(false);
      }
    };

    // Drag and drop beyond the table range
    const handleMouseMove = (e) => {
      if (!e.target.dataset.hour) {
        isMoveout = true;
      }
    };

    const handleMoveOut = (isOut: boolean) => {
      isMoveout = isOut;
    };

    // The core code for calculating the drag box area
    const handleDrag = (props: DragProps) => {
      const {
        type,
        clientX,
        clientY,
        layerX,
        layerY,
        iden,
        hour,
        value,
        isDrag,
      } = props;
      if (type === "up") {
        setIsDrag(false);
        isFocus = false;
        return;
      }
      let tempWidth: number, tempHeight: number;
      const factor = hasHalfHour ? 2 : 1; // Determine the multiple of the td offset based on whether there is a half hour
      // Convert the time corresponding to the td where the starting point is located, such as '10:00' into ['10', '00'] format
      const hourMinuteArr = hour.split(":");
      // Determine the td where the starting point is the number of tds in the line, which is used to determine the clientX and clientY of the td where the starting point is
      const tdIndex = ~~hourMinuteArr[1]
        ? ~~hourMinuteArr[0] * factor + 1
        : ~~hourMinuteArr[0] * factor;
      type === "down"
        ? handleDragDown({ clientX, clientY, layerX, layerY, iden, tdIndex })
        : handleDragMove({
            isDrag,
            layerX,
            layerY,
            tempWidth,
            tempHeight,
            iden,
            hour,
            value,
          });
    };

    // on press
    const handleDragDown = ({
      clientX,
      clientY,
      layerX,
      layerY,
      iden,
      tdIndex,
    }) => {
      setWidth(0);
      setHeight(0);
      setIsDrag(true);
      startX = clientX;
      startY = clientY;
      topY = layerY - iden * 20 - 40;
      leftX = layerX - tdIndex * 16 - 60;
      startLayerX = tdIndex * 16 + 60;
      startLayerY = ~~iden * 20 + 40;
      isFocus = false;
      setTop(startY - topY);
      setLeft(startX - leftX);
    };

    // It may be a normal move, or it may be a drag move
    const handleDragMove = ({
      isDrag,
      layerX,
      layerY,
      tempWidth,
      tempHeight,
      iden,
      hour,
      value,
    }) => {
      if (isDrag) {
        let diffX = layerX - startLayerX;
        let diffY = layerY - startLayerY;
        tempWidth = diffX > 0 ? diffX : 16 - diffX;
        tempHeight = diffY > 0 ? diffY : 20 - diffY;
        const newWidth =
          tempWidth % 20 === 0 && diffX > 0
            ? Math.ceil(tempWidth / 16) * 16 + 1
            : Math.ceil(tempWidth / 16) * 16;
        const newHeight =
          tempHeight % 20 === 0 && diffY > 0
            ? Math.ceil(tempHeight / 20) * 20 + 20
            : Math.ceil(tempHeight / 20) * 20;
        setWidth(newWidth);
        setHeight(newHeight);
        diffX < 0
          ? setLeft(startX - leftX - width + 25)
          : setLeft(startX - leftX);
        diffY < 0 ? setTop(startY - topY - height + 10) : setTop(startY - topY);
      }
      isFocus = true;
    };

    return (
      <div
        className="week-time-range-picker"
        style={hasHalfHour ? { maxWidth: "830px" } : { maxWidth: "450px" }}
      >
        {isDrag ? (
          <div
            className="wtrp-schedule"
            style={{
              left: `${left}px`,
              top: `${top}px`,
              width: `${width}px`,
              height: `${height}px`,
            }}
          ></div>
        ) : null}
        <table className="wtrp-table">
          <WeekTimeRangePickerThead
            hasHalfHour={hasHalfHour}
            outerCellColor={outerCellColor}
            fontColor={fontColor}
          />
          <WeekTimeRangePickerTbody
            hasHalfHour={hasHalfHour}
            checkedDatas={cacheChecked}
            handleDrag={handleDrag}
            handleSelect={handleSelect}
            handleMoveOut={handleMoveOut}
            outerCellColor={outerCellColor}
            innerCellColor={innerCellColor}
            summaryColor={summaryColor}
            fontColor={fontColor}
          />
        </table>
      </div>
    );
  };

export default ReactWeekTimeRangePicker;

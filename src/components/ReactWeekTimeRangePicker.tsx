import React, { useState, useEffect } from "react";
import { ReactWeekTimeRangePickerProps, SelectedDataProps, DragProps } from "../interface";
import "./less/base.less"
import "./less/index.less"
import "./less/time-range-picker-common.less"
import WeekTimeRangePickerTbody from "./WeekTimeRange/weekTimeRangePickerTbody";
import WeekTimeRangePickerThead from "./WeekTimeRange/weekTimeRangePickerThead";


let isFocus = false // Determine whether the focus is obtained by clicking
let isMoveout = false // Determine whether to move out of the time selection range
let startX = 0 // record starting point when clicked.clientX
let startY = 0 // record starting point when clicked.clientY
let startLayerX = 0 // Record the distance from the upper left corner of the td corresponding to the starting point to the x-axis of the table
let startLayerY = 0 // The distance from the upper left corner of the record starting point to the upper left corner of the td and the y-axis of the table
let topY = 0 // Record the vertical deviation of the boundary when the starting point is clicked
let leftX = 0 // record starting point when layerX is clicked - The distance from the left side of the td to the left side of the table
let popperTop = 0 // The offset value of the record prompt box compared to the bottom of the table
let popperLeft = 0 // Record the left offset value of the prompt box table
let currentVal = '' // Cache the concatenated string of the week and hour corresponding to the current td
let nextTime = '' // Cache the next time of the current time, for example, if it is currently at 00:00, the next time should be 00:30 or 01:00 (determined according to hasHalfHour)

const ReactWeekTimeRangePicker: React.FunctionComponent<ReactWeekTimeRangePickerProps> = (props: ReactWeekTimeRangePickerProps) => {
  const [isDrag, setIsDrag] = useState(false) // Control drag frame development
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [cacheChecked, setCacheChecked] = useState<SelectedDataProps[]>(props.selectedData || []) // Cache selected time data

  useEffect(() => {
    document.body.addEventListener('mouseup', handleMouseup)
    document.body.addEventListener('mousemove', handleMousemove)
    return () => {
      document.body.removeEventListener('mouseup', handleMouseup)
      document.body.removeEventListener('mousemove', handleMousemove)
    }
  })

  const { hasHalfHour, selectTimeRange } = props


  // Get the selected data and throw it to the parent component
  const handleSelect = (selected: SelectedDataProps[]) => {
    setCacheChecked(selected)
    selectTimeRange && selectTimeRange(selected)
  }

  // Release after dragging exceeds the table range
  const handleMouseup = (e) => {
    if (e && !e.target.dataset.hour) {
      setIsDrag(false)
    }
  }
  // Drag and drop beyond the table range
  const handleMousemove = (e) => {
    if (!e.target.dataset.hour) {
      isMoveout = true
    }
  }

  const handleMoveout = (isOut: boolean) => {
    isMoveout = isOut
  }

  // The core code for calculating the drag box area
  const handleDrag = (props: DragProps) => {
    const { type, clientX, clientY, layerX, layerY, iden, hour, value, isDrag } = props
    if (type === 'up') {
      setIsDrag(false)
      isFocus = false
      return
    }
    let tempWidth, tempHeight
    const factor = hasHalfHour ? 2 : 1 // Determine the multiple of the td offset based on whether there is a half hour
    // Convert the time corresponding to the td where the starting point is located, such as '10:00' into ['10', '00'] format
    const hourMinuteArr = hour.split(':')
    // Determine the td where the starting point is the number of tds in the line, which is used to determine the clientX and clientY of the td where the starting point is 
    const tdIndex = ~~hourMinuteArr[1] ? ~~hourMinuteArr[0] * factor + 1 : ~~hourMinuteArr[0] * factor
    type === 'down' ? 
      handleDragDown({ clientX, clientY, layerX, layerY, iden, tdIndex }) :
        handleDragMove({ isDrag, layerX, layerY, tempWidth, tempHeight, iden, hour, value })
  }
  // on press
  const handleDragDown = ({ clientX, clientY, layerX, layerY, iden, tdIndex }) => {
    setWidth(0)
    setHeight(0)
    setIsDrag(true)
    startX = clientX
    startY = clientY
    topY = layerY - iden * 20 - 40
    leftX = layerX - tdIndex * 16 - 60
    startLayerX = tdIndex * 16 + 60
    startLayerY = (~~iden * 20) + 40
    isFocus = false
    setTop(startY - topY)
    setLeft(startX - leftX)
  }
  // It may be a normal move, or it may be a drag move
  const handleDragMove = ({ isDrag, layerX, layerY, tempWidth, tempHeight, iden, hour, value }) => {
    if (isDrag) {
      let diffX = layerX - startLayerX
      let diffY = layerY - startLayerY
      tempWidth = diffX > 0 ? diffX : 16 - diffX
      tempHeight = diffY > 0 ? diffY : 20 - diffY
      const newWidth = tempWidth % 20 === 0 && diffX > 0 ? Math.ceil(tempWidth / 16) * 16 + 1 : Math.ceil(tempWidth / 16) * 16
      const newHeight = tempHeight % 20 === 0 && diffY > 0 ? Math.ceil(tempHeight / 20) * 20 + 20 : Math.ceil(tempHeight / 20) * 20
      setWidth(newWidth)
      setHeight(newHeight)
      diffX < 0 ? setLeft(startX - leftX - width + 16) : setLeft(startX - leftX)
      diffY < 0 ? setTop(startY - topY - height + 20) : setTop(startY - topY)
    }
    isFocus = true
    // setIsFocus(true)
    // tipPosition(iden, hour, value)
  }

  /**
   * @param {string} iden the day of the week where the current td is located 
   * @param {string} tdIndex The current td is at the position of this tr 
   * @desc Calculate the position of the tooltip
    * popperLeft: Calculate the offset value of the prompt box from the left side of the table,
    * popperLeft = the horizontal distance of the td from the right side of the week-td - ? (calculated with or without half an hour)
    * ? ==> Depends on the content width of the reminder box, without half an hour === half the width of the content box, exactly 31 approximately 32
    * popperTop: Calculate the offset value of the prompt box below the table,
    * popperTop = the vertical height of the week from the thead where the td is located + thead height - (table real-time height + reminder box height)
    * Bug fixes:
    * 1. When a time period with more than 7 intervals is selected, the week will occupy two lines, and the height will increase from 21 to 42, so it is necessary to traverse the selected time data to determine how many lines it occupies in total 
   */

  //  const tipPosition = (iden, time, value) => {
  //    const hour = ~~time.substring(0, 2)
  //    const minute = ~~time.substring(3)
  //    currentVal = value
  //   //  const tableHeight = this.$refs.table.clientHeight
  //   //  popperTop = (~~iden + 1) * 20 + 40 - tableHeight - 55
  //    // 只有小时
  //    if (!hasHalfHour) {
  //      nextTime = hour + 1 >= 10 ? `${hour + 1}:00` : `0${hour + 1}:00`
  //      popperLeft = (hour - 1) * 16 + 13
  //      return
  //    }
  //    if (minute === 30) {
  //      nextTime = hour + 1 >= 10 ? `${hour + 1}:00` : `0${hour + 1}:00`
  //      popperLeft = (hour * 2) * 16 + 13
  //      return
  //    }
  //    nextTime = time.substring(0, 2) + ':30'
  //    popperLeft = (hour * 2 - 1) * 16 + 13
  //  }

  return (
    <div className="week-time-range-picker" style={
      hasHalfHour ? {maxWidth: '830px'} : {maxWidth: '450px'}
    }>
      {/* drag box */}
      {
        isDrag ? 
          <div className="wtrp-schedule" style={
            {
              left: `${left}px`,
              top: `${top}px`,
              width: `${width}px`,
              height: `${height}px`
            }
          }>
          </div> : null
      }
      <table className="wtrp-table">
        <WeekTimeRangePickerThead hasHalfHour={hasHalfHour} />
        <WeekTimeRangePickerTbody hasHalfHour={hasHalfHour} checkedDatas={cacheChecked} 
          handleDrag={handleDrag} 
          handleSelect={handleSelect} 
          handleMoveout={handleMoveout} 
        />
      </table >
      {/* <div className="wtrp-byted-popover-wrapper">
        <div className="ant-tooltip ant-tooltip-placement-top ant-tooltip-hidden">
          <div className="ant-tooltip-content">
            <div className="ant-tooltip-arrow"></div>
            <div className="ant-tooltip-inner">{1}</div>
          </div>
        </div>
      </div> */}
    </div >
  )
}

export default ReactWeekTimeRangePicker
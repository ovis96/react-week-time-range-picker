import React from 'react'
import "../../less/base.less"
import "../../less/time-range-picker-select.less"
import { weekMaps } from '../../config/tbody.js'
import { SelectedProps } from '../ReactWeekTimeRangePicker/ReactWeekTimeRangePicker.type'

/**
 * @desc sort the selected dates,
  * Sort by iden: Monday ~ Sunday
  * Sort by time: 00:00~23:00 
 */
const sort = (curr, next) => {
  if (curr.iden) {
    return curr.iden - next.iden
  }
  // Sort 00:00 and 00:30
  if (curr.substring(0, 2) === next.substring(0, 2)) {
    return curr.substring(3) - next.substring(3)
  }
  return curr.substring(0, 2) - next.substring(0, 2)
}

/**
   * @desc Merge times, merge time periods without interval such as [00:00, 01:00, 02:00]
    * If it takes half an hour, then it takes [00:00, 00:30, 01:00] to merge into [00:00, 01:00]
   */
const handleMergeTimes = (hasHalfHour, times) => {
  let mergeTimes = [[times[0]]]
  hasHalfHour ? handleMergeHalfHour(times, mergeTimes) : handleMergeHour(times, mergeTimes)
  return mergeTimes
}

// Only hourly data merge
const handleMergeHour = (times, mergeTimes) => {
  times.forEach(item => {
    const lastMergeArr = mergeTimes.slice(-1)[0]
    const isNext = item.substring(0, 2) - lastMergeArr.slice(-1)[0].substring(0, 2) === 1
    if (isNext) {
      lastMergeArr.push(item)
    }
    if (!isNext && item !== times[0]) {
      mergeTimes.push([item])
    }
  })
}

// Data merge with half an hour
const handleMergeHalfHour = (times, mergeTimes) => {
  times.forEach(item => {
    const lastMergeArr = mergeTimes.slice(-1)[0]
    // 00:00-00:30 or 00:30 - 01:00
    // hour*100 + 0 or 50, half an hour becomes 50
    const lastMergeItem = lastMergeArr.slice(-1)[0]
    const itemNum = item.substring(0, 2) * 100 + (item.substring(3) === '30' ? 50 : 0)
    const lastMergeNum = lastMergeItem.substring(0, 2) * 100 + (lastMergeItem.substring(3) === '30' ? 50 : 0)
    const isNext = itemNum - lastMergeNum === 50
    if (isNext) {
      lastMergeArr.push(item)
    }
    if (!isNext && item !== times[0]) {
      mergeTimes.push([item])
    }
  })
  mergeTimes.forEach(item => {
    const hour = +item.slice(-1)[0].substring(0, 2)
    if (item.slice(-1)[0].substring(3) === '30') {
      hour > 8 ? item.push(`${hour + 1}:00`) : item.push(`0${hour + 1}:00`)
    } else {
      hour > 8 ? item.push(`${hour}:30`) : item.push(`0${hour}:30`)
    }
  })
}

// If it is only an hour, it needs to be dealt with
const fromat = (last) => {
  const hour = ~~last.substring(0, 2) + 1
  return hour > 9 ? `${hour}:00` : `0${hour}:00`
}

const WeekTimeRangeSelected: React.FunctionComponent<SelectedProps> = (props: SelectedProps) => {
  const { hasHalfHour, checkedDatas, handleEmpty } = props

  // Add data fields for easy display 
  let cacheChecked = checkedDatas || []
  cacheChecked.sort(sort).map((item, index) => {
    cacheChecked[index].week = weekMaps.get(item.iden)
    cacheChecked[index].mergeTimes = handleMergeTimes(hasHalfHour, item.times.sort(sort))
  })

  // clear
  const handleClear = () => {
    handleEmpty()
  }
  
  return (
    <tr className="wtrp-time-range-selected">
      <td colSpan={49} className="wtrp-selected-td">
        <div className="wtrp-clearfix">
          {
            checkedDatas.length === 0 ? 
              <span className="wtrp-fl tip-text">Drag the mouse to select the time period</span> :
              <span className="wtrp-fl tip-text">Time period selected</span>
          }
          <a className="wtrp-fr" onClick={handleClear}>clear selection</a>
        </div>
        {
          cacheChecked.map((item, i) => {
            return (
              <div className="wtrp-selected-td__selected-time" key={i}>
                <p className="wtrp-flex wtrp-break">
                  <span className="tip-text">{item.week}：</span>
                  <span className="wtrp-flex-1">
                    {
                      item.mergeTimes.map((time, timeIndex) => {
                        return <span className="wtrp-selected-text" key={timeIndex}>
                          {hasHalfHour ? `${time[0]}~${time[time.length - 1]}` : `${time[0]}~` + fromat(time[time.length - 1])}
                        </span>
                      })
                    }
                  </span>
                </p>
              </div>
            )
          })
        }
      </td>
    </tr>
  )
}

export default WeekTimeRangeSelected
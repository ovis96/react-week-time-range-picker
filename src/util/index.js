import { allHours, allWithHalfHours } from '../config/thead'

/**
 * 
 * @param {*} curr 
 * @param {*} next 
 * @description Normal sorting, used for Monday~Sunday sorting
 */
export const sort = (curr, next) => {
  return curr - next
}

/**
 * @description Sort the start and end times in the box selection range
 */
export const sortHour = (curr, next) => {
  return curr.substring(0, 2) - next.substring(0, 2)
}

/**
 * 
 * @param {*} hoursArr ["03:30", "06:30"]
 * @description Process the time range and put all time periods within the time range into an array
 * The result is for example: ["03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30"]
 */
export const handleRange = (hasHalfHour, hoursArr) => {
  let startIndex, endIndex
  // no half hour 
  if (!hasHalfHour) {
    startIndex = allHours.indexOf(hoursArr[0])
    endIndex = allHours.indexOf(hoursArr[1])
    return allHours.slice(startIndex, endIndex + 1)
  }
  // half an hour
  startIndex = allWithHalfHours.indexOf(hoursArr[0])
  endIndex = allWithHalfHours.indexOf(hoursArr[1])
  return allWithHalfHours.slice(startIndex, endIndex + 1)
}

/**
 * 
 * @param {*} arr 
 * @description Working with date ranges
 */
export const handleDayRange = (arr) => {
  let temp = []
  for (let i = arr[0]; i <= arr[1]; i++) {
    temp.push(String(i))
  }
  return temp
}

/**
 * 
 * @description Process the data within the frame selection range, construct the data structure I need, and need logical steps such as deduplication
 */
export const handleCheckedData = ({cacheChecked, hasStart, has, idenIndex, iden, timeRange}) => {
  let temp = { // Cache data, don't declare it in the loop, otherwise it will open up multiple memory spaces
    iden: iden,
    times: []
  }
  let timeIndex = -1
  // Start the frame selection. At this time, it is in the starting point td box. You only need to judge whether the date of the td (time) is in the selected data, and add it if it is not.
  if (!hasStart && !has) {
    cacheChecked.push(temp)
  }
  for (let i = 0; i < timeRange.length; i++) {
    // Find whether the current time has been selected before; such as previous click, box selection behavior
    timeIndex = !!has ? cacheChecked[idenIndex].times.indexOf(timeRange[i]) : -1
    // uncheck; prune the selected time range// 取消选中；对已选中的时间范围进行删减
    if (hasStart && has) {
      timeIndex >= 0 && cacheChecked[idenIndex].times.splice(timeIndex, 1)
      if (cacheChecked[idenIndex].times.length === 0) {
        cacheChecked.splice(idenIndex, 1)
        break
      }
      continue
    } 
    // frame selection time range
    if (!hasStart) {
      // The week already exists in the selected data, but the time is not available
      if (timeIndex === -1 && idenIndex >= 0) {
        cacheChecked[idenIndex].times.push(timeRange[i])
        continue
      }
      // There is no data for this week in the selected data
      temp.times.push(timeRange[i])
    }
  }
}
# react-week-time-range-picker

## Introduction
It's a simple React component for selecting a range of hours per day of the week.

![image](https://user-images.githubusercontent.com/51862073/159894346-101b05b0-41e8-489e-a9f1-d5c2b476a38a.png)

This component is a fork from https://github.com/lizhongzhen11/react-week-time-range-picker
With various change such as:
- Reworked completely in english rather than in chinese
- Add customizable styles
- Better architecture and code improvement
- Added minimal storybook
- Props name slightly changed to be more obvious
- Switch from Webpack to Rollup
- Some bug fixes

## Get Started
To start using it do
`$ npm install @marinos33/react-week-time-range-picker --save`

And then you can import it like this:

```js
import ReactWeekTimeRangePicker from '@marinos33/react-week-time-range-picker'

<ReactWeekTimeRangePicker />
```

##Props
The available props for this components are the following.
| Prop                 | Description                                                        | Type                                              | Default   |
| ---------------------| -------------------------------------------------------------------|---------------------------------------------------|-----------|
| **`hasHalfHour`**    | Wheter to display the hour and is following half hour              | boolean                                           | false     |
| **`selectedData`**   | The data displayed in the component                                | SelectedDataProps[ ]<br/>(more information below) | [ ]       |
| **`outerCellColor`** | The color of the outer cells                                       | string                                            | #DDDEE1   | 
| **`innerCellColor`** | The color of the inner cell when inactive                          | string                                            | #f5f5f5   |
| **`fontColor`**      | The color of the text                                              | string                                            | #000000   |
| **`summaryColor`**   | The background color of the summary at the bottom of the component | string                                            | #ffffff   |

| Function             | Description                                                        | Return Type                                          
| ---------------------| -------------------------------------------------------------------|-------------------------------------------------|
| **selectTimeRange**  | Function to get the selectedData and do whetever you want with.    | void                                            |

Example:
```
import ReactWeekTimeRangePicker from '@marinos33/react-week-time-range-picker'

const handleSelectTimeRange = (selectedData: SelectedDataProps[]) => {
    console.log(selectedData)
}
  
<ReactWeekTimeRangePicker hasHalfHour={true} selectTimeRange={handleSelectTimeRange} />
```

The structure of SelectedDataProps:
```
 {
    iden?: string; // the id of the day. eg: monday = 1, tuesday = 2, ... sunday = 7
    timeRanges?: string[][]; // the time from the selected box to the end box. eg: [['02:30', '03:00']]
    times?: string[]; //the time original clicked on. eg: ['02:30']
    dayName?: string; //the name of the day. eg: monday, tuesday, etc
 }
 ```

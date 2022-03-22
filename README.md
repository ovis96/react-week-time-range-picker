# react-week-time-range-picker

usage
```js
npm install react-week-time-range-picker --save
yarn add react-week-time-range-picker

// jsx/tsx
import ReactWeekTimeRangePicker from 'react-week-time-range-picker'

const Test = () => {
  // To get selected Value
  const handleSelectTimeRange = (selectedData) => {
    console.log(selectedData)
  }
}
<react-week-time-range-picker hasHalfHour={true} selectedData={[]} selectTimeRange={handleSelectTimeRange} />
```

## API

```js
interface ReactWeekTimeRangePickerProps {
  hasHalfHour?: boolean; // true | false (default with half-hour)
  selectedData?: SelectedDataProps[];
  selectTimeRange?: (checked: SelectedDataProps[]) => void // receive selected time
}

// selectedData: Data Structures
[
  {
    iden: '3',
    mergeTimes: [['02:30', '03:00']],
    times: ['02:30'],
    week: 'Thursday'
  }
]
```
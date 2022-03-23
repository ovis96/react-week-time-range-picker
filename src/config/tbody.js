export const days = [
  {
    iden: '1',
    dayName: 'Monday'
  },
  {
    iden: '2',
    dayName: 'Tuesday'
  },
  {
    iden: '3',
    dayName: 'Wednesday'
  },
  {
    iden: '4',
    dayName: 'Thursday'
  },
  {
    iden: '5',
    dayName: 'Friday'
  },
  {
    iden: '6',
    dayName: 'Saturday'
  },
  {
    iden: '7',
    dayName: 'Sunday'
  }
]

const weekMaps = new Map()
days.forEach((item) => {
  weekMaps.set(item.iden, item.dayName)
})

export {weekMaps}
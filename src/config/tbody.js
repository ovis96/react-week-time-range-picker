export const weeks = [
  {
    iden: '1',
    week: 'Monday'
  },
  {
    iden: '2',
    week: 'Tuesday'
  },
  {
    iden: '3',
    week: 'Wednesday'
  },
  {
    iden: '4',
    week: 'Thursday'
  },
  {
    iden: '5',
    week: 'Friday'
  },
  {
    iden: '6',
    week: 'Saturday'
  },
  {
    iden: '7',
    week: 'Sunday'
  }
]

const weekMaps = new Map()
weeks.forEach((item) => {
  weekMaps.set(item.iden, item.week)
})

export {weekMaps}
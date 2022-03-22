export const weeks = [
  {
    iden: '0',
    week: 'Monday'
  },
  {
    iden: '1',
    week: 'Tuesday'
  },
  {
    iden: '2',
    week: 'Wednesday'
  },
  {
    iden: '3',
    week: 'Thursday'
  },
  {
    iden: '4',
    week: 'Friday'
  },
  {
    iden: '5',
    week: 'Saturday'
  },
  {
    iden: '6',
    week: 'Sunday'
  }
]

const weekMaps = new Map()
weeks.forEach((item) => {
  weekMaps.set(item.iden, item.week)
})

export {weekMaps}
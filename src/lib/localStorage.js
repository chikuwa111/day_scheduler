export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('day_schedule_state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('day_schedule_state', serializedState)
    return true
  } catch (err) {
    console.dir(err)
    return false
  }
}

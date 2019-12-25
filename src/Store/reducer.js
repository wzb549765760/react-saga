import { INIT_LIST_ITEM } from './actionTypes'
//默认数据
const defaultState = {
  name: '123',
  list: [1, 2, 3, 4, 5, 6]
}
export default (state = defaultState, action) => {
  let newStats = null
  if (action.type === INIT_LIST_ITEM) {
    newStats = JSON.parse(JSON.stringify(state))
    newStats.list = action.list
    return newStats
  }
  return state
}
import { INIT_LIST_ITEM_SAGA,LOGIN_IMF_SAGA } from './actionTypes'
export const initListActionSaga = () => ({
  type: INIT_LIST_ITEM_SAGA
})

export const loginImfActionSaga = (username,password) => ({
  type: LOGIN_IMF_SAGA,
  username,
  password
})

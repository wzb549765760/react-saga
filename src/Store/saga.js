import { put, takeEvery } from 'redux-saga/effects'

import { INIT_LIST_ITEM_SAGA, INIT_LIST_ITEM } from './actionTypes'

import http from '../Util/http'

let promist = function() {
  return new Promise((resolve, reject) => {
    http.get('/api/shop', {}, data => {
      if (data.responeStatus === '0') {
        resolve(data.data.list)
      }
    })
  })
}
function* getListFun() {
  const list = yield promist()
  yield put({
    type: INIT_LIST_ITEM,
    list
  })
}

function* mySaga() {
  yield takeEvery(INIT_LIST_ITEM_SAGA, getListFun)
}

export default mySaga

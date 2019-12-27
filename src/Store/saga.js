import { put, takeEvery } from 'redux-saga/effects'

import { INIT_LIST_ITEM_SAGA, INIT_LIST_ITEM ,LOGIN_IMF,LOGIN_IMF_SAGA} from './actionTypes'

import http from '../Util/http'

import {loginPromise} from "./httpPromise/Login"

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
function* getLoginImfFun(obj) {
  const list = yield loginPromise(obj.username,obj.password);
  yield put({
    type: LOGIN_IMF,
    list
  })
}

function* mySaga() {
  yield takeEvery(INIT_LIST_ITEM_SAGA, getListFun)
  yield takeEvery(LOGIN_IMF_SAGA, getLoginImfFun)
}

export default mySaga

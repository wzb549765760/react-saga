import {put, takeEvery} from 'redux-saga/effects'

import {LOGIN_IMF, LOGIN_IMF_SAGA, OUT_LOGIN, OUT_LOGIN_SAGA} from './actionTypes'

import {loginOutPromise} from './httpPromise/loginAndRegister'

function* getLoginImfFun(obj) {
    yield put({
        type: LOGIN_IMF,
        obj
    })
}

function* outLoginFun(obj) {
    debugger
    yield loginOutPromise(obj.token);
    yield put({
        type: OUT_LOGIN,
    })
}

function* mySaga() {
    yield takeEvery(LOGIN_IMF_SAGA, getLoginImfFun);
    yield takeEvery(OUT_LOGIN_SAGA, outLoginFun);

}

export default mySaga

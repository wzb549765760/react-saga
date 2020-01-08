import {LOGIN_IMF_SAGA, OUT_LOGIN_SAGA} from './actionTypes'

/*缓存登录信息*/
export const loginImfActionSaga = (username, password, token) => ({
    type: LOGIN_IMF_SAGA,
    username,
    password,
    token
});

/*退出登录 清空登录信息*/
export const outLoginActionSaga = (token) => ({
    type: OUT_LOGIN_SAGA,
    token
});

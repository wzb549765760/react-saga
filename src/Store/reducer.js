import {LOGIN_IMF_SAGA, OUT_LOGIN_SAGA} from './actionTypes'

let loginImf = "";
if (sessionStorage.getItem("loginImf") != undefined && sessionStorage.getItem("loginImf") != null) {
    console.log(sessionStorage.getItem("loginImf"))
    loginImf = JSON.parse(sessionStorage.getItem("loginImf"));
}
//默认数据
const defaultState = {
    loginImf/*登录信息*/
};
export default (state = defaultState, action) => {
    let newStats = null;
    if (action.type === LOGIN_IMF_SAGA) {
        newStats = JSON.parse(JSON.stringify(state));
        newStats.loginImf = {
            username: action.username,
            password: action.password,
            token: action.token
        };
        sessionStorage.setItem("loginImf", JSON.stringify(newStats.loginImf));
        return newStats
    }
    if (action.type === OUT_LOGIN_SAGA) {
        newStats = JSON.parse(JSON.stringify(state));
        newStats.loginImf = "";
        sessionStorage.removeItem("loginImf");
        return newStats
    }
    return state
}

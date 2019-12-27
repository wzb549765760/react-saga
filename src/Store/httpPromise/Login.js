import http from "../../Util/http";

function loginPromise(username, password) {
    return new Promise((resolve, reject) => {
        http.post('/api/login/index', {username, password}, data => {
            if (data.responeStatus === '0') {
                resolve(data.data.list)
            }
        })
    })
}

export{
    loginPromise
};

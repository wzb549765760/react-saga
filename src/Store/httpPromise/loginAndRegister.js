import http from "../../Util/http";
function loginOutPromise(token) {
    return new Promise((resolve, reject) => {
        http.formData({
            parmas: {
                token: token
            },
            method: "post",
            url: "/api/entry/logout",
            callback: (data) => {
                if (data.respCode === '000000') {
                    resolve();
                }
            }
        });
    })
}

export{
    loginOutPromise
};

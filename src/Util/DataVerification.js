import {checkValByExp, checkVal, isCardIDs} from "./reg";

export default {
    checkName: (rule, value, callback) => {
        if (!checkVal(value)) {
            callback("姓名不能为空");
        } else if (value.length > 10) {
            callback("请输入1-10个汉字");
        } else if (!checkValByExp(value, "china")) {
            callback("请输入1-10个汉字");
        } else {
            callback();
        }
    },
    checkIdCardNo: (rule, value, callback) => {
        console.log(isCardIDs(value));
        let cardObj = isCardIDs(value);
        if (!checkVal(value)) {
            callback("身份证号码不能为空");
        } else if (cardObj["STATUS"] === "error") {
            callback(cardObj["ERROR"]);
        } else {
            callback();
        }
    },
    checkBankCardNo: (rule, value, callback) => {
        if (!checkVal(value)) {
            callback("银行卡号码不能为空");
        } else if (!checkValByExp(value, "bankNum")) {
            callback("银行卡号码格式错误");
        } else {
            callback();
        }
    },
    checkMobile: (rule, value, callback) => {
        if (checkVal(value) && !checkValByExp(value, "mobile")) {
            callback("手机号码格式错误");
        } else {
            callback();
        }
    }
};


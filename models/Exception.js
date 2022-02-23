const Exception = class Exception {
    code;
    msg;

    constructor(code, msg){
        this.code = code;
        this.msg = msg;
    }
}

module.exports = Exception;
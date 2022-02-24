export default class Exception {

    code :number;
    msg :any;

    constructor(code :number, msg :any){
        this.code = code;
        this.msg = msg;
    }
}

module.exports = Exception;
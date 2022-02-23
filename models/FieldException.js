const FieldException = class FieldException {
    
    code;
    msg;
    fix;

    constructor(code, msg, varName, typeWaited, typeOf){
        this.code = code;
        this.msg = msg;
        this.fix = typeOf === "undefined" ? `Insira um valor: '${varName}': <${typeWaited}>'` : `O tipo inserido (${typeOf}) não é aceito. O Correto é: '${varName}': <${typeWaited}>`;
    }

}

module.exports = FieldException;
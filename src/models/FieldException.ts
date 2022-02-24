export default class FieldException {
    
    code :number;
    msg :string;
    fix :string;

    constructor(code :number, msg :string, varName :string, typeWaited :string, typeOf :string){
        this.code = code;
        this.msg = msg;
        this.fix = typeOf === "undefined" ? `Insira um valor: '${varName}': <${typeWaited}>'` : `O tipo inserido (${typeOf}) não é aceito. O Correto é: '${varName}': <${typeWaited}>`;
    }

}

module.exports = FieldException;
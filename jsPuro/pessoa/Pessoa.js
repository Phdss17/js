class Pessoa{
    #nome;
    #idade;
    constructor(nome, idade){
        this.#nome = nome;
        const idadeNum = Number(idade);
        if (isNaN(idadeNum) || idadeNum < 0) {
            throw new Error("Idade inválida");
        }
this.#idade = idadeNum;
    }

    get nome(){
        return this.#nome;
    }

    get idade(){
        return this.#idade;
    }

    apresentar(){
        console.log(`Olá meu nome é ${this.#nome} e eu tenho ${this.#idade} anos\n`);
    }
}

module.exports = Pessoa;


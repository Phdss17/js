const Pessoa = require('./Pessoa');

class Professor extends Pessoa{
    #disciplina;
    constructor(nome, idade, disciplina){
        super(nome, idade);
        this.#disciplina = disciplina;
    }

    ensinar(){
        console.log(`Professor(a) ${this.nome} está ensinando ${this.#disciplina}\n`);
    }
}

module.exports = Professor; 
const Pessoa = require('./Pessoa');

class Aluno extends Pessoa{
    #matricula;
    constructor(nome, idade, matricula){
        super(nome, idade);
        this.#matricula = matricula;
    }

    exibirMatricula(){
        console.log(`Aluno(a) ${this.nome} tem a matrícula de número ${this.#matricula}\n`);
    }
}

module.exports = Aluno;
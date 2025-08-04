const Aluno = require('./Aluno');
const Professor = require('./Professor');

async function main() {
    let P1 = new Professor("Ph", "30", "FUP");
    let A1 = new Aluno("Vitoria", "20", "563132");

    P1.apresentar();
    P1.ensinar();

    A1.apresentar();
    A1.exibirMatricula();
}

main();
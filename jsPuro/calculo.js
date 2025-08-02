//cria uma referência para o "objeto" da biblioteca 
const readline = require('readline');

//função simples que retorna ou uma string de erro ou um objeto com as opearções
function calcular(x, y){
    if(Number.isNaN(x) || Number.isNaN(y)){
        return "Erro: parâmetros inválidos";
    } else {
        return {
            soma: x + y,
            sub: x - y,
            mult: x * y,
            div: x / y
        };
    }
}

//cria uma referência para a função de leitura do teclado da biblioteca em questão
//rl -> readline.createInterface. readline -> 'readline'
const rl = readline.createInterface({
    input: process.stdin,//leitura
    output: process.stdout//saida
});

//contador externo usado na recursão
let contador = 0;

//função usada para receber os números, fazendo as perguntas
function perguntar() {
    if (contador >= 2) {
        rl.close();//fecha o leitor
        return;
    }

    rl.question("Primeiro número: ", (entrada1) => {
        rl.question("Segundo número: ", (entrada2) => {
            const x = Number(entrada1);
            const y = Number(entrada2);

            const resultado = calcular(x, y);

            if (typeof resultado === "string") {
                console.log(resultado);
            } else {
                console.log(`soma: ${resultado.soma}`);
                console.log(`sub: ${resultado.sub}`);
                console.log(`mult: ${resultado.mult}`);
                console.log(`div: ${resultado.div}`);
            }

            contador++;
            perguntar(); 
        });
    });
}

perguntar();

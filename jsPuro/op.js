const readline = require('readline/promises')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function exec(n1, n2, func) {
    return func(n1, n2)
}

function criarFunc(op) {
    let func
    switch (op) {
        case "+":
            return (a, b) => a + b
        case "-":
            return (a, b) => a - b
        case "*":
            return (a, b) => a * b  
        case "/":
            return (a, b) => a / b
        default:
            throw new Error("Erro: operação inválida")
    }
}

async function main() {
    let strN1 = await rl.question("")
    let op = await rl.question("")
    let strN2 = await rl.question("")

    let n1 = Number(strN1)
    let n2 = Number(strN2)
    try{
        if(Number.isNaN(n1) || Number.isNaN(n2)){
            throw new Error("Erro: Entrada não numerica para operação")
        }else{
           console.log(exec(n1, n2, criarFunc(op)))
        }
    }catch(error){
        console.error(error)
    }
    rl.close();
}

main()
const readline = require('readline/promises')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function calc() {
    let strN1 = await rl.question("")
    let op = await rl.question("")
    let strN2 = await rl.question("")

    let n1 = Number(strN1)
    let n2 = Number(strN2)
    try{
        if(Number.isNaN(n1) || Number.isNaN(n2)){
            throw new Error("Erro: Entrada não numerica para operação")
        }else{
            if(op === "+"){
                console.log(n1+n2)
            }else if(op === "-"){
                console.log(n1-n2)
            }else if(op === "*"){
                console.log(n1*n2)
            }else if(op === "/"){
                if(n2 === 0){
                    throw new Error("Erro: Divisão por zero")
                }
                console.log(n1/n2)
            }else{
                throw new Error("Erro: operação inválida")
            }
        }
    }catch(error){
        console.error("", error)
    }
    rl.close();
}

calc()
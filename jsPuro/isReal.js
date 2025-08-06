const readline = require('readline/promises')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function isReal() {
    let str = await rl.question("dê uma entrada: ")
    let num = Number(str)
    if(Number.isNaN(num)){
        console.log("não é um número")
    }else{
        console.log("é um número")
    }
    rl.close()
}

isReal()
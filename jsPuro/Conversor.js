const readline = require('readline/promises')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function Conversor() {
    str = await rl.question("Escreva o numero: ")
    console.log(`Original: ${str}`)
    console.log(`Como numero: ${Number(str)}  (tipo: ${typeof Number(str)})`)
    console.log(`Como booleano: ${!!str}  (tipo: ${typeof !!str})`)
    console.log(`Como string: ${String(str)}  (tipo: ${typeof String(str)})`)
    rl.close()
}

Conversor()
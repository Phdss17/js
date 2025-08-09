const readline = require('readline/promises')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function txtAnaliser(str) {
    let letras = 0
    let digitos = 0
    let espacos = 0
    let simbolos = 0
    for(i = 0; i < str.length; i++){
        if(str[i].match(/[0-9]/)){
            digitos++
        }else if(str[i].match(/\s/)){
            espacos++
        }else if(str[i].match(/[a-z]/i)){
            letras++
        }else{
            simbolos++
        }
    }
    return {
        letras: letras,
        digitos: digitos,
        espacos: espacos,
        simbolos: simbolos
    }
}

async function main() {
    let str = await rl.question("Escreva qualquer coisa: ")

    let result = txtAnaliser(str)
    console.log(`Letras: ${result.letras} \nDígitos: ${result.digitos} \nEspaços: ${result.espacos} \nSímbolos: ${result.simbolos}`)
    rl.close()
}


main()

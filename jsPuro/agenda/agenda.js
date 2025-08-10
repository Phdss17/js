const readline = require('readline/promises')
const compromisso = require('./compromisso')

const rl = readline.createInterface({
    input: process.stdin,
    output:  process.stdout
})

const compromissos = []

function opcoes() {
    console.log(`1- Adicionar compromisso 
    2- Listar compromissos
    3- Procurar por palavra-chave no título
    4- Remover por índice 
    5- Mostrar o próximo compromisso mais próximo da data atual
    0- Sair`
    )
}

function dataTreat(data) {
    [dia, mes, ano] = data.split('/').map(Number)
    const date = new Date()

    if(Number.isNaN(dia) || Number.isNaN(mes) || Number.isNaN(ano)){
        throw new Error("Data inválida: caracter inválido!!\n")
    }

    let data2 = new Date(ano, mes-1, dia)

    if(data2.getDate() != dia || data2.getMonth() != mes || data2.getFullYear != ano){
        throw new Error("Data inválida: data inexistente!!\n")
    }

    if(date > data2){
        throw new Error("Data inválida: Não é póssivel agendar no passado!!\n")
    }
    
    return data
}

async function add() {
    let titulo = await rl.question("Qual o título do seu compromisso? ")
    let data = await rl.question("Qual a data do seu compromisso?(dia/mes/ano) ")
    data = dataTreat(data)
    let confirmacao = await rl.question("Deseja adicionar uma descrição ao seu compromisso?(s/n) ")
    let descricao = ""

    if(confirmacao == "s"){
        descricao = await rl.question("Escreva a descrição a seguir: ") 
    }

    compromissos.push(new compromisso(titulo, data, descricao))
    compromissos.sort((comp1, comp2) => comp1.data - comp2.data )
}

async function list() {
    if(compromissos.length > 0){
        for (i = 0; i < compromissos.length; i++) {
            console.log(`${i} -  ${compromissos[i]}\n`)
        }
    }else{
        console.log("Nenhum compromisso registrado!")
    }
}

async function find() {
    if(compromissos.length > 0){
        let palavra = await rl.question("Digite a palavra chave para busca: ")
        palavra = palavra.toLowerCase()
        const comps = []
        for(const comp of compromissos){
            if(comp.titulo.toLowerCase().includes(palavra)){
                comps.push(comp)
            }
        }

        if(comps.length === 0){
            console.log("Palavra-chave não encontrada!!\n")
        }else{
            for(const comp of comps){
                console.log(`${comp}\n`)
            }
        }    
    }else{
        console.log("Nenhum compromisso registrado!")
    }
}

async function remove() {
    if(compromissos.length > 0){
        let index = await rl.question("escreva o index que deseja remover: ")
        index = Number(index)
        if(Number.isNaN(index) || compromissos.length-1 < index){
            throw new Error("Index inválido")
        }
    
        compromissos.splice(index, 1)
    }else{
        console.log("Nenhum compromisso registrado!")
    }
}

async function show() {
    if(compromissos.length > 0){
        console.log(`${compromissos[0]}\n`)
    }else{
        console.log("Nenhum compromisso registrado!")
    }
}

async function main() {
    let resposta = "";
    while(resposta != "0"){
        try{
            opcoes()
            resposta = await rl.question("O que deseja fazer? ")
            switch (resposta) {
                case "1":
                    await add()
                    break;
                case "2":
                    await list()
                    break;
                case "3":
                    await find()
                    break;
                case "4":
                    await remove()
                    break;
                case "5":
                    await show()
                    break;
                case "0":
                    break;
                default:
                    throw new Error("Opção fora de escopo!!\n");
            }
        }catch(error){
            console.error(error)
        }
    }
    rl.close()
}

main()
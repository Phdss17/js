const readline = require('readline/promises')
const tarefa = require('./tarefa')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const tarefas = [] 

function validarData(dataStr) {
    const [dia, mes, ano] = dataStr.split('/').map(Number)
    const data = new Date(ano, mes-1, dia)
    const hoje = new Date()
    if(data.getDate() !== dia || data.getMonth() !== mes-1 || data.getFullYear() !== ano){
        throw new Error("Data inválida!")
    }
    if(hoje > data){
        throw new Error("Não se pode registrar datas de entraga no passado!")
    }
    return data
}

function validarIndex(index) {
    if(Number.isNaN(index) || !Number.isInteger(index) || (index < 0 || index > tarefas.length-1)){
        throw new Error("Index inválido!")
    }
}

function validarPrioridade(prioridade) {
    if(Number.isNaN(prioridade) || !Number.isInteger(prioridade)){
        throw new Error("Prioridade inválida!")
    }

    if(prioridade < 1 || prioridade > 5){
        throw new Error("Grau de importância fora do escopo!")
    }
}

async function adicionar(params) {
    const titulo = await rl.question("Escreva o título da tarefa: ")

    const dataStr = await rl.question("Escreva a data da tarefa:(dd/mm/aaaa) ")
    const data = validarData(dataStr)

    const prioridadeStr = await rl.question("Escreva o grau de importância da atividade:(1-5) ")
    const prioridade = Number(prioridadeStr)
    validarPrioridade(prioridade)
         
    tarefas.push(new tarefa(titulo, prioridade, data))
}

async function remover() {
    if(tarefas.length === 0){
        throw new Error("Não há tarefas a serem removidas!")
    }
    
    const index = await rl.question("Qual o index da tarefa que deseja remover? ")
    index = Number(index)
    validarIndex(index)
    tarefas.splice(index, 1)
}

async function concluir() {
    if(tarefas.length === 0){
        throw new Error("Não há tarefa a serem concluídas!")
    }
    
    const index = await rl.question("Qual o index da tarefa que deseja concluir? ")
    index = Number(index)
    validarIndex(index)    
    
    tarefas[index].concluida = true
}

async function listar(vector) {
    console.table(vector.map(tarefa => tarefa.toObject()))
}

async function filtrar() {
    console.log([
        "1 - Por prioridade",
        "2 - Por status de conclusão",
        "3 - Pela combinação da 1 e 2"].join("\n"))
    const filtro = await rl.question("Qual filtro deseja aplicar? ")
    let prioridadeStr, prioridade, conclusao, concluida
    switch (filtro) {
        case "1":
            prioridadeStr = await rl.question("A partir de qual nível deve-se filtrar? ")
            prioridade = Number(prioridadeStr)
            validarPrioridade(prioridade)
            listar(tarefas.filter(tarefa => tarefa.prioridade >= prioridade))
            break
        case "2":
            conclusao = await rl.question("Filtrar por concluidas ou pendentes?(c/p) ")
            concluida = (conclusao === "c")
            listar(tarefas.filter(tarefa => tarefa.concluida === concluida))
            break
        case "3":
            prioridadeStr = await rl.question("A partir de qual nível deve-se filtrar? ")
            prioridade = Number(prioridadeStr)
            validarPrioridade(prioridade)

            conclusao = await rl.question("Filtrar por concluidas ou pendentes?(c/p) ")
            concluida = (conclusao === "c")

            listar(tarefas.filter(tarefa => tarefa.prioridade >= prioridade).filter(tarefa => tarefa.concluida === concluida))
            break
        default:
            throw new Error("Critério de filtro fora de escopo!")
    }
}

async function ordenar(params) {
    console.log([
        "1 - Por prioridade",
        "2 - Por data",
        "3 - Pela combinação da 1 e 2"].join("\n"))
    const filtro = await rl.question("Qual filtro deseja aplicar? ")
    switch (filtro) {
        case "1":
            tarefas.sort((tarefa1, tarefa2) => tarefa1.prioridade - tarefa2.prioridade)
            break
        case "2":
            tarefas.sort((tarefa1, tarefa2) => tarefa1.dataEntrega - tarefa2.dataEntrega)
            break
        case "3":
            tarefas.sort((tarefa1, tarefa2) => {
                if (tarefa1.prioridade !== tarefa2.prioridade) {
                    return tarefa1.prioridade - tarefa2.prioridade;
                }

                return tarefa1.dataEntrega - tarefa2.dataEntrega;
            })
            break
        default:
            throw new Error("Critério de filtro fora de escopo!")
    }
}

async function bloco() {
    let resposta = ""
    while (resposta != "0") {
        try {
            console.log([
                "1 - Adicionar tarefa",
                "2 - Remover tarefa por index",
                "3 - Concluir tarefa por index",
                "4 - Listar tarefas",
                "5 - Filtrar tarefa",
                "6 - Ordenar tarefas",
                "0 - Sair"
            ].join("\n"));
            resposta = await rl.question("O que deseja fazer? ")
            switch (resposta) {
                case "1":
                    await adicionar()
                    break;
                case "2":
                    await remover()
                    break;
                case "3":
                    await concluir()
                    break;
                case "4":
                    await listar(tarefas)
                    break;
                case "5":
                    await filtrar()
                    break;
                case "6":
                    await ordenar()
                    break;
                case "0":
                    break;
                default:
                    throw new Error("Opção fora de escopo!\n");
            } 
        } catch (error) {
            console.log(error)
        }
    }
    rl.close()
}

bloco()
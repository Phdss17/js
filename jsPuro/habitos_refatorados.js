const readline = require ('readline/promises');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let habitos = [];

function registrarHabito(nome, data, concluido){
    habitos.push({nome, data, concluido});
}

function analisarHabito(nome, mes, ano){
    let habitoFiltrado = habitos.filter(h => 
        h.nome === nome &&
        h.data.getMonth() === mes &&
        h.data.getFullYear() === ano
    );

    let diasTotais = habitoFiltrado.length;
    let diasConcluidos = habitoFiltrado.filter(h => h.concluido === true).length;

    return {
        diasTotais: diasTotais,
        diasConcluidos: diasConcluidos,
        porcentagem: diasTotais > 0 ? (diasConcluidos/diasTotais)*100 : 0
    };
}

async function agenda(){
    try{
        const habito = await rl.question("Escreva o hábito:\n ");
        const dataStr = await rl.question("Data [dia/mes/ano]:\n ");
        const concluida = (await rl.question("Essa atividade foi realizada?[y/n]\n ")).toLowerCase();
        const [dia, mes, ano] = dataStr.split('/').map(Number);
        const data = new Date(ano, mes, dia);
        registrarHabito(habito, data, concluida === "y");
    } catch(error) {
        console.error("erro no input", error.message);
    }
}

async function main(){
    let confirm = await rl.question("Deseja registrar mais hábitos ou verificar algum?[y/n]\n ");;
    while(confirm === "y"){
        try{
            const which = await rl.question("Registrar ou Verificar?[reg/ver]\n ");
            if(which === "reg"){
                await agenda();
            }else if(which === "ver"){
                const habito = await rl.question("Escreva o hábito:\n ");
                const dataStr = await rl.question("Data [/mes/ano]:\n ");
                const [mes, ano] = dataStr.split('/').map(Number);
                mostrarAnalise(habito, mes, ano, analisarHabito(habito));
            }
            confirm = await rl.question("Deseja registrar mais hábitos ou verificar algum?[y/n]\n ");
            } catch(error) {
                console.error("erro no input", error.message);
            }
        }
    rl.close();
}

function mostrarAnalise(habito, mes, ano, analiseHabito){
    habito = habito.toUpperCase();
    console.log(
        `Análise do hábito: ${habito}
        Total de dias registrados em ${mes} de ${ano}: ${analiseHabito.diasTotais}
        Dias concluídos: ${analiseHabito.diasConcluidos}
        Desempenho: ${analiseHabito.porcentagem}%\n`);

    if(analiseHabito.porcentagem >= 70){
        console.log(`PARABÉNS!! Sua performance foi incrível`);
    }else if(analiseHabito.porcentagem >= 40 && analiseHabito.porcentagem <= 69){
        console.log(`Parabéns!! Mas tenho certeza que consegue mais`);
    }else{
        console.log(`Vamos trabalhar na melhora desse hábito`);
    }
    console.log("\n");
}

main();
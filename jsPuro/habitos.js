const readline = require('readline');

var habitos = [];

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

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function nomeMes(numeroMes) {
    const meses = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ];
    return meses[numeroMes];
}

function agenda(){
    rl.question("Deseja registrar um hábito ou verificar um hábito?[reg/ver] ", function(which){
        if(which === "reg"){
            rl.question("Escreva o hábito que deseja registrar: ", function(habito){
                rl.question("Escreva a data da realização desse hábito:[dia/mes/ano] ", function(dateStr){
                    const [dia, mes, ano] = dateStr
                            .split('/')
                            .map(Number);
                            const data = new Date(ano, (mes - 1), dia);
                    rl.question("Escreva se realizou ou não o hábito:[y/n] ", function(confirm){
                        registrarHabito(habito, data, (confirm  === "y"));
                    rl.question("Deseja registrar ou verificar outro hábito?[y/n] ", function(confirm){
                        if(confirm === "y"){
                            agenda();
                        }else{
                            rl.close();
                        }
                    });
                    });
                });
            });
        }else if(which === "ver"){
            rl.question("Escreva o hábito que deseja verificar:", function(habito){
                rl.question("escreva a data da verificação:[mes/ano]", function(date){
                    let [mes, ano] = date
                    .split('/')
                    .map(Number);
                    let analiseHabito = analisarHabito(habito, (mes - 1), ano);
                    mostrarAnalise(habito, (mes - 1), ano, analiseHabito);
                    rl.question("Deseja registrar ou verificar outro hábito?[y/n] ", function(confirm){
                        if(confirm === "y"){
                            agenda();
                        }else{
                            rl.close();
                        }
                    });
                });
            });
        }else{ rl.close(); }
    });
}

function mostrarAnalise(habito, mes, ano, analiseHabito){
    console.log(`Análise do hábito: ${habito.toUpperCase()}`);
    console.log(`Total de dias registrados em ${nomeMes(mes)} de ${ano}: ${analiseHabito.diasTotais}`);
    console.log(`Dias concluídos: ${analiseHabito.diasConcluidos}`);
    console.log(`Desempenho: ${analiseHabito.porcentagem}%`);
    if(analiseHabito.porcentagem >= 70){
        console.log(`PARABÉNS!! Sua performance foi incrível`);
    }else if(analiseHabito.porcentagem >= 40 && analiseHabito.porcentagem <= 69){
        console.log(`Parabéns!! Mas tenho certeza que consegue mais`);
    }else{
        console.log(`Vamos trabalhar na melhora desse hábito`);
    }
}

agenda();
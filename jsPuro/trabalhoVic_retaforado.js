const readline = require('readline/promises');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let movimentos = [];


function adicionarMovimento(tipo, descricao, valor, categoria, data) {
    movimentos.push({
        tipo: tipo,
        descricao: descricao,
        valor: valor,
        categoria: categoria,
        data: data,
    });
}

function calcularSaldo() {
    return movimentos.reduce(function (saldo, mov) {
        return mov.tipo === 'entrada' ? saldo + mov.valor : saldo - mov.valor;
    }, 0);
}

function saldoNoDia(dia) {
    return movimentos
        .filter(function (mov) {
            return mov.data <= dia;
        })
        .reduce(function (saldo, mov) {
            return mov.tipo === 'entrada'
                ? saldo + mov.valor
                : saldo - mov.valor;
        }, 0);
}

function totalGastoNoDia(dia) {
    return movimentos
        .filter(function (mov) {
            return mov.tipo === 'saida' && mesmaData(mov.data, dia);
        })
        .reduce(function (total, mov) {
            return total + mov.valor;
        }, 0);
}

function resumoMensal(mes, ano) {
    var entradas = movimentos
        .filter(function (mov) {
            return (
                mov.tipo === 'entrada' &&
                mov.data.getMonth() === mes &&
                mov.data.getFullYear() === ano
            );
        })
        .reduce(function (total, mov) {
            return total + mov.valor;
        }, 0);
    var saidas = movimentos
        .filter(function (mov) {
            return (
                mov.tipo === 'saida' &&
                mov.data.getMonth() === mes &&
                mov.data.getFullYear() === ano
            );
        })
        .reduce(function (total, mov) {
            return total + mov.valor;
        }, 0);
    return {
        entradas: entradas,
        saidas: saidas,
        saldo: entradas - saidas,
    };
}

function mesmaData(a, b) {
    return (
        a.getDate() === b.getDate() &&
        a.getMonth() === b.getMonth() &&
        a.getFullYear() === b.getFullYear()
    );
}

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

async function perguntarMovimento() {
    let continuar = "s";
    while(continuar === "s"){
        try {
            const tipo = await rl.question('Digite o tipo (entrada/saida): ');
            const descricao = await rl.question('Descrição: ');
            const valor = await rl.question('Valor: ');
            const categoria = await rl.question('Categoria (fixo/variavel): ');
            const dataStr = await rl.question('Data (Dia-Mês-Ano): ');
            const [dia, mes, ano] = dataStr
                .split('-')
                .map(Number);
            const data = new Date(ano, mes - 1, dia);
            const valorNumerico = parseFloat(
                valor.replace(',', '.')
            );
            adicionarMovimento(
                tipo,
                descricao,
                valorNumerico,
                categoria,
                data
            );
            continuar = (await rl.question('Deseja adicionar outro movimento? (s/n): ')).toLowerCase();
        } catch (error){
            console.error("erro no input", error.message);
        }
        
    }

    mostrarResumo();
    rl.close();
}

function mostrarResumo() {
    console.log('\n--- Movimentos ---');
    movimentos.forEach((mov) => {
        const dataFormatada =
            `${mov.data.getDate().toString().padStart(2, '0')}/` +
            `${(mov.data.getMonth() + 1).toString().padStart(2, '0')}/` +
            `${mov.data.getFullYear()}`;
        const valorFormatado = mov.valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
        console.log(
            `${mov.tipo.toUpperCase()} | ${
                mov.descricao
            } | ${valorFormatado} | ${mov.categoria} | ${dataFormatada}`
        );
    });
    // Descobre o mês e ano do último movimento, ou do mês atual se não houver movimentos
    let mes, ano;
    if (movimentos.length > 0) {
        const ultimoMov = movimentos[movimentos.length - 1];
        mes = ultimoMov.data.getMonth();
        ano = ultimoMov.data.getFullYear();
    } else {
        const hoje = new Date();
        mes = hoje.getMonth();
        ano = hoje.getFullYear();
    }

    const resumo = resumoMensal(mes, ano);
    const nomeDoMes = nomeMes(mes);

    // Formata os valores do resumo
    const entradasFormat = resumo.entradas.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    const saidasFormat = resumo.saidas.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    const saldoFormat = resumo.saldo.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    console.log(`\n--- Resumo do mês de ${nomeDoMes} de ${ano} ---`);
    console.log(`Entradas: ${entradasFormat}`);
    console.log(`Saídas: ${saidasFormat}`);
    console.log(`Saldo: ${saldoFormat}`);
}

perguntarMovimento();
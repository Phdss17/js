"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("node:readline/promises");
var node_process_1 = require("node:process");
var rl = readline.createInterface({ input: node_process_1.stdin, output: node_process_1.stdout });
var movimentos = [];
function adicionarMovimento(move) {
    movimentos.push(move);
}
function calcularSaldo() {
    return movimentos.reduce(//itera pelos elementos do vetor acumulando determinado elemento, na variavel saldo
    function (saldo, mov) {
        return mov.tipo === 'entrada' ? saldo + mov.valor : saldo - mov.valor;
    }, 0); //saldo comeca zerado
}
function saldoNoDia(dia) {
    return movimentos
        .filter(function (mov) {
        return mov.data <= dia; //filtra um dia específico
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
        return mov.tipo === 'saida' && mesmaData(mov.data, dia); //filtra pelas saídas
    })
        .reduce(function (total, mov) {
        return total + mov.valor; //soma todas
    }, 0);
}
function mesmaData(a, b) {
    return (a.getDate() === b.getDate() &&
        a.getMonth() === b.getMonth() &&
        a.getFullYear() === b.getFullYear());
}
function resumoMensal(mes, ano) {
    var movData = movimentos
        .filter(function (mov) {
        return (mov.data.getMonth() === mes &&
            mov.data.getFullYear() === ano);
    });
    var saidas = movData
        .filter(function (mov) {
        return (mov.tipo === 'saida');
    })
        .reduce(function (total, saida) {
        return total + saida.valor; // soma as saidas
    }, 0);
    var entradas = movData
        .filter(function (mov) {
        return (mov.tipo === 'entrada'); //filtra por entrada
    })
        .reduce(function (total, entrada) {
        return total + entrada.valor; //soma as entradas
    }, 0);
    return {
        entradas: entradas,
        saidas: saidas,
        saldo: entradas - saidas,
    };
}
function nomeMes(numeroMes) {
    var meses = [
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
function perguntarMovimento() {
    return __awaiter(this, void 0, void 0, function () {
        var continuar, tipo, descricao, valorStr, categoria, dataStr, _a, dia, mes, ano, data, valor, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    continuar = "s";
                    _b.label = 1;
                case 1:
                    if (!(continuar === "s")) return [3 /*break*/, 11];
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 9, , 10]);
                    return [4 /*yield*/, rl.question('Digite o tipo (entrada/saida): ')];
                case 3:
                    tipo = _b.sent();
                    return [4 /*yield*/, rl.question('Descrição: ')];
                case 4:
                    descricao = _b.sent();
                    return [4 /*yield*/, rl.question('Valor: ')];
                case 5:
                    valorStr = _b.sent();
                    return [4 /*yield*/, rl.question('Categoria (fixo/variavel): ')];
                case 6:
                    categoria = _b.sent();
                    return [4 /*yield*/, rl.question('Data (Dia-Mês-Ano): ')];
                case 7:
                    dataStr = _b.sent();
                    _a = dataStr
                        .split('-')
                        .map(Number), dia = _a[0], mes = _a[1], ano = _a[2];
                    data = new Date(ano, mes - 1, dia);
                    valor = parseFloat(valorStr.replace(',', '.'));
                    adicionarMovimento({
                        tipo: tipo,
                        descricao: descricao,
                        valor: valor,
                        categoria: categoria,
                        data: data
                    });
                    return [4 /*yield*/, rl.question('Deseja adicionar outro movimento? (s/n): ')];
                case 8:
                    continuar = (_b.sent()).toLowerCase();
                    return [3 /*break*/, 10];
                case 9:
                    error_1 = _b.sent();
                    console.error("erro no input", error_1.message);
                    return [3 /*break*/, 10];
                case 10: return [3 /*break*/, 1];
                case 11:
                    mostrarResumo();
                    rl.close();
                    return [2 /*return*/];
            }
        });
    });
}
function mostrarResumo() {
    console.log('\n--- Movimentos ---');
    movimentos.forEach(function (mov) {
        var dataFormatada = "".concat(mov.data.getDate().toString().padStart(2, '0'), "/") +
            "".concat((mov.data.getMonth() + 1).toString().padStart(2, '0'), "/") +
            "".concat(mov.data.getFullYear());
        var valorFormatado = mov.valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
        console.log("".concat(mov.tipo.toUpperCase(), " | ").concat(mov.descricao, " | ").concat(valorFormatado, " | ").concat(mov.categoria, " | ").concat(dataFormatada));
    });
    // Descobre o mês e ano do último movimento, ou do mês atual se não houver movimentos
    var mes, ano;
    if (movimentos.length > 0) {
        var ultimoMov = movimentos[movimentos.length - 1];
        mes = ultimoMov.data.getMonth();
        ano = ultimoMov.data.getFullYear();
    }
    else {
        var hoje = new Date();
        mes = hoje.getMonth();
        ano = hoje.getFullYear();
    }
    var resumo = resumoMensal(mes, ano);
    var nomeDoMes = nomeMes(mes);
    // Formata os valores do resumo
    var entradasFormat = resumo.entradas.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    var saidasFormat = resumo.saidas.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    var saldoFormat = resumo.saldo.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    console.log("\n--- Resumo do m\u00EAs de ".concat(nomeDoMes, " de ").concat(ano, " ---"));
    console.log("Entradas: ".concat(entradasFormat));
    console.log("Sa\u00EDdas: ".concat(saidasFormat));
    console.log("Saldo: ".concat(saldoFormat));
}
perguntarMovimento();

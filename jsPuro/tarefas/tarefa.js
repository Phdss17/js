class tarefa{
    constructor(titulo, prioridade, dataEntrega, concluida = false){
        this.titulo = titulo
        this.prioridade = prioridade
        this.dataEntrega = dataEntrega.toLocaleDateString('pt-BR')
        this.concluida = concluida
    }

    toObject(){
        return {
            Título: this.titulo,
            Prioridade: this.prioridade,
            "Data de entraga": this.dataEntrega,
            Status: (this.concluida === true ? "Concluída" : "Pendente")
        };
    }
}

module.exports = tarefa
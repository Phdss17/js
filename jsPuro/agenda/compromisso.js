class compromisso{
    constructor(Titulo, Data, Descricao = ""){
        this.titulo = Titulo
        this.data = Data
        this.descricao = Descricao
    }

    tempoRestante(){
        const date = new Date()
        let faltante = this.data - date
        faltante = (this.data - date) / (1000 * 60 * 60 * 24);

        
        return faltante.toFixed(0)
    }

    toString(){
        return `${this.titulo} - ${this.data.toLocaleDateString('pt-BR')} (${this.tempoRestante()} dias restantes) - ${(this.descricao != "" ? this.descricao : "")}` 
    }
}

module.exports = compromisso; 
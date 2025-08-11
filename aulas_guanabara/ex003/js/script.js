function contar() {
    const ini = document.getElementById('txtini')
    const fim = document.getElementById('txtfim')
    const passo = document.getElementById('txtpass')
    let res = document.getElementById('res')

    if (ini.value.length == 0 || fim.value.length == 0 || passo.value.length == 0) {
        res.innerHTML = "Impossível contar!"
    } else {
        res.innerHTML = "Contando:<br>"
        let i = Number(ini.value)
        let f = Number(fim.value)
        let p = Number(passo.value)
        if(p == 0){
            p = 1
            window.alert("[ERRO] Passo inválido, contando como 1")
        }
        if (i < f) {
            for (i; i < f; i += p) {
                
                res.innerHTML += `${i} \u{27A1}`
            }
        } else {
            for (i; i > f; i -= p) {
                res.innerHTML += `${i} \u{2796}`
            }
        }
        res.innerHTML += `\u{1F3C1}`
    }
}
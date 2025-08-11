function verificar() {
    const data = new Date()
    const ano = data.getFullYear()
    const fano = document.getElementById('txtano')
    const res = document.querySelector('div#res')
    if(fano.value.length == 0 || Number(fano.value) > ano){
        window.alert("[ERRO] Verifique os dados e tente novamente")
    }else{
        const fsex = document.getElementsByName('radsex')
        const idade = ano - Number(fano.value)
        let gen = ''
        let img = document.createElement('img')
        img.setAttribute('id', 'foto')
        if(fsex[0].checked){
            gen = "Homem"
            if(idade >= 0 || idade <= 10){
                //foto bb h
            }else if(idade <= 20){
                //foto jovem h
            }else if(idade <= 50){
                //foto adulto h
            }else {
                //foto idoso h
            }
        }else{
            gen = "Mulher"
            if(idade >= 0 || idade <= 10){
                //foto bb m
            }else if(idade <= 20){
                //foto jovem m
            }else if(idade <= 50){
                //foto adulto m
            }else {
                //foto idoso m
            }
            window.alert("BEISSO")
        }
        res.style.textAlign = 'center'
        res.innerHTML = `Detectamos ${gen} com ${idade} anos.`
        res.appendChild(img)
    }
}
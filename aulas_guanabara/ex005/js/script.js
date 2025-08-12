const nums = []
const res = document.getElementById('res')
const numStr = document.getElementById('txtn')
const selec = document.getElementById('selec')

function guardar() {
    res.innerHTML = ''
    if(numStr.value.length != 0){
        const num = Number(numStr.value)
        if(!nums.includes(num) && !(num < 1 || num > 100)){
            let option = document.createElement('option')
            option.text = `valor ${num} adicinado.`
            option.value = `selec${nums.length}`   
            nums.push(num)
            selec.appendChild(option)
        }
    }
    numStr.value = ''
    numStr.focus()
}

function analisar() {
    if(nums.length == 0){
        window.alert("[ERRO] nenhum número adicinado")
    }else{
        nums.sort()
        let soma = 0
        for (let i = 0; i < nums.length; i++) {
            soma += nums[i];
        }
        res.innerHTML = `<p>Ao todo, temos ${nums.length} números cadastrados.</p>`
        res.innerHTML += `<p>O maior valor informado foi ${nums[nums.length-1]}.</p>`
        res.innerHTML += `<p>O menor valor informado foi ${nums[0]}.</p>`
        res.innerHTML += `<p>Somando todos os valores, temos ${soma}.</p>`
        res.innerHTML += `<p>A média dos valores digitados é ${soma/nums.length}.</p>`
    }
}

function limpar() {
    document.getElementById('selec').innerHTML = '';
    nums.splice(0, nums.length)
}
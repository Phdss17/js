function gerar() {
    const operando = document.getElementById('op')
    const selec = document.getElementById('tab')
    let op
    if(operando.value.length == 0){
        op = 0
    }else{
        op = Number(operando.value)
    }
    selec.innerHTML = ''
    for(let i = 1; i <= 10; i++){
        let item = document.createElement('option')
        item.text = `${i} X ${op} = ${i*op}`
        item.value = `selec${i}`
        selec.appendChild(item)
    }
}
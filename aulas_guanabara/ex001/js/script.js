function carregar() {
    let msg = document.getElementById('msg');
    let img = document.getElementById('imagem');
    let saud = document.getElementById('saudacao');
    let data = new Date();
    let hora = data.getHours();
    let minutos = data.getMinutes();
    msg.innerHTML = `Agora são ${hora}:${minutos}`;
    if(hora < 12 && hora >= 5){
        amanhecer(img, saud);
    }else if(hora >= 12 && hora < 18){
        entardecer(img, saud);
    }else{
        anoitecer(img, saud);
    }
}

function amanhecer(img, saud) {
    img.src = 'assets/morningimage.jpg';
    document.body.style.background = "#ADD8E6";
    saud.innerHTML = 'Bom dia!';
}

function entardecer(img, saud) {
    img.src = 'assets/afternoonimage.jpg';
    document.body.style.background = '#3a3a91ff';
    saud.innerHTML = 'Boa tarde!';
}

function anoitecer(img, saud) {
    img.src = 'assets/nightimage.jpg'
    document.body.style.background = '#2a293e ';
    saud.innerHTML = 'Boa noite!';
}
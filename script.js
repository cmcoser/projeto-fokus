const html = document.querySelector('html');
const botaoFoco = document.querySelector('.app__card-button--foco');
const botaoCurto = document.querySelector('.app__card-button--curto');
const botaoLongo = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const tempoNaTela = document.querySelector('#timer')
const musica = new Audio('sons/luna-rise-part-one.mp3');
const somPlay = new Audio('sons/play.wav');
const somPause = new Audio('sons/pause.mp3');
const somZero = new Audio('sons/beep.mp3');
const botaoStartPause = document.querySelector('#start-pause');

musica.loop = true;
somPlay.pause = true;

let tempoDecorridoEmSegundos = 1500
let intervaloId = null;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    }
    else{
        musica.pause();
    }
});

botaoFoco.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco');
    botaoFoco.classList.add('active');
    
});

botaoCurto.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto');
    botaoCurto.classList.add('active');
    
});

botaoLongo.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo');
    botaoLongo.classList.add('active');
    
});

function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;    

            break;
        case  'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`;

            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa!</strong>`; 
        default:
            break;
    }

}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        somZero.play();
        alert("Tempo Finalizado!");
        zerar();
        return
        
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo()
}

botaoStartPause.addEventListener('click', iniciarPausar);

function iniciarPausar(){
    if(intervaloId){
        somPause.play();
        zerar();
        return
    }
    somPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = "Pausar"
    iniciarOuPausarBt.previousElementSibling.setAttribute('src','imagens/pause.png');
}

function zerar(){
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = "Começar"
    iniciarOuPausarBt.previousElementSibling.setAttribute('src','imagens/play_arrow.png');
    intervaloId = null;
    
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()
var tiempos = [0.15, 0.3, 0.7, 1, 1.3, 1.9, 2, 2.5, 3, 3.5];

var tiempoVivo = 0;


// en espera = 1, reproduddciendo = 0
var capa_1 = {html_clip: document.querySelector("#capa_1"),
                temporizador: 0,
                duracion: 0};


var capa_2 = {html_clip: document.querySelector("#capa_2"),
                temporizador: 0,
                duracion: 0};

var capa_3 = {html_clip: document.querySelector("#capa_3"),
                temporizador: 2000,
                duracion: 9.5,
                tiempos_aparicion: [1.5, 3, 4]};

var capa_4 = {html_clip: document.querySelector("#capa_4"),
                temporizador: 2500,
                duracion: 11.5,
                tiempos_aparicion: [5, 7]};

var capa_5 = {html_clip: document.querySelector("#capa_5"),
                temporizador: 1450,
                duracion: 9.5,
                tiempos_aparicion: [0.5, 0.7, 1.3, 1.5, 1.8, 2.1, 2.4]};

var capa_6 = {html_clip: document.querySelector("#capa_6"),
                temporizador: 1750,
                duracion: 9,
                tiempos_aparicion: [7, 8, 10]};

var capa_7 = {html_clip: document.querySelector("#capa_7"),
                temporizador: 2750,
                duracion: 15,
                tiempos_aparicion: [6, 8, 11, 15]};


var capa_base = [capa_1, capa_2];
var capa_efectos = [capa_3, capa_4, capa_5, capa_6, capa_7];


function programa(delta){
    capa_efectos.forEach(capa => {
        if(capa.html_clip.paused && capa.temporizador <= 0){
            capa.temporizador = parseInt((tiempo_aleatorio(capa.tiempos_aparicion) + capa.duracion) * 1000); 
            capa.html_clip.play();
        }
        else{
            var tempo = parseInt(capa.temporizador) - parseInt(delta);
            capa.temporizador = tempo;
        }
    });
}

function iniciar_proceso(){
    if(tiempoVivo == 0){
        tiempoVivo = 10;
        capa_base.forEach(capa => {
            capa.html_clip.play();
        });

        capa_efectos.forEach(capa => {
            capa.temporizador =  parseInt(tiempo_aleatorio(capa.tiempos_aparicion) * 1000); 

        });

        ciclica()
    }
}

function ciclica(timeFrame = 16){
    var delta = (tiempoVivo - timeFrame) * -1;
    tiempoVivo = timeFrame;

    programa(delta);

    window.requestAnimationFrame(ciclica);
}


function tiempo_aleatorio(tiempos_disponibles = tiempos){
    return tiempos_disponibles[numero_aleatorio(0, tiempos_disponibles.length)] * 1;
}

function numero_aleatorio(minimo, maximo){
    return Math.floor(Math.random() * (maximo - minimo) + minimo);
}


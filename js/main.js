var recognizer = null;
var recognitionStarted = false;

function start() {
    recognizer = typeof SpeechRecognition === 'undefined' ? new webkitSpeechRecognition : new SpeechRecognition;

    if (!recognizer) {
        throw new Error('SpeechRecognition is not supported');
    }

    recognizer.lang = 'pt-br';
    recognizer.continuous = true;
    recognizer.interimResults = true;

    recognizer.onaudiostart = () => {
        // altera a variável de estado de gravação para indicar que começou a gravar o áudio
        recognitionStarted = true;
        console.log('Iniciou');
    }

    recognizer.onaudioend = () => {
        // altera a variável de estado de gravação para indicar que parou de gravar o áudio
        recognitionStarted = false;
        console.log('Parou');
    }

    recognizer.onresult = (event) => {

        console.log(event);

        // pego o áudio já convertido em texto
        let results = event.results;

        let transcript = null;
        for (let i = 0; i < results.length; i++) {
            transcript = event.results[i][0];
        }
        
        if (transcript != null) {
            let conteudoCaixa = $('#msg').html();
            //conteudoCaixa = conteudoCaixa+" "+transcript.transcript;

            let textoLido = transcript.transcript;
            let arrayTexto = textoLido.split(" ");

            for (let i = 0; i < arrayTexto.length; i++) {

                if (arrayTexto[i].trim() != "") {
                    let substituir = '<b>'+arrayTexto[i].trim()+'</b>';
                    conteudoCaixa = conteudoCaixa.replace(arrayTexto[i].trim(), substituir);
                    console.log(arrayTexto[i]);
                }

            }

            $('#msg').html(conteudoCaixa);

        }
    }

}

function ouvir() {
    if (!recognitionStarted) {
        // inicio a gravação
        recognizer.start();
    } else {
        // se estiver gravando eu paro de gravar
        recognizer.stop();
    }
}

function pararDeOuvir() {
    recognizer.stop();
}

window.onload = ()=>{
    start();
};
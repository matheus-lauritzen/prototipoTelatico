function falar() {
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[5]; // Note: some voices don't support altering params
    msg.voiceURI = 'native';
    msg.volume = 1; // 0 to 1
    msg.rate = 1.8; // 0.1 to 10
    msg.pitch = 2; //0 to 2
    msg.text = 'Carro com suspeita de furto visto em Balneário Camboriú - MHA6236';
    msg.lang = 'pt-br';

    msg.onend = function(e) {
        console.log('Finished in ' + event.elapsedTime + ' seconds.');
    };

    speechSynthesis.speak(msg);

    speechSynthesis.getVoices().forEach(function(voice) {
        console.log(voice.voiceURI);
    });


}
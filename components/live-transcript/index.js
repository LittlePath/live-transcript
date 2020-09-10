window.customElements.define('live-transcript',
  class LiveTranscript extends HTMLElement{
    constructor(){
      super();
    }

    connectedCallback(){
      const shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.appendChild(this.style);
      shadowRoot.appendChild(this.content);

      let startStopButton = this.shadowRoot.querySelector('#start-stop');
      startStopButton.addEventListener('click', (event) => this.startStopClickHandler(event));

      this.recognition = undefined;
      this.transcribing = false;
    }

    get style(){
      let style = document.createElement('style');
      style.innerHTML = `
        .stop{ 
          background-color: red;
        }

        #transcript-window{
          width: 50%;
        }
      `;
      return style;
    }

    get content(){
      let content = document.createElement('section');
      content.innerHTML = `
<button id="start-stop">Start Transcript</button> 
<div id="transcript-window"></div> 
      `;

      return content;
    }

    startStopClickHandler(event){
      if(this.transcribing){
        this.stop();
      }else{
        this.start();
      }
    }

    start(){
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      let startStopButton = this.shadowRoot.querySelector('#start-stop');
      if(typeof SpeechRecognition === "undefined"){
        this.write(`This browser doesn't support the <a href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition">SpeechRecognition</a> API. Try Google Chrome, Microsoft Edge, or one of the browsers listed at <a href="https://caniuse.com/mdn-api_speechrecognition">caniuse.com</a>.`);  
        startStopButton.disabled = true;
      }else{
        startStopButton.innerHTML = 'Stop Transcript';
        startStopButton.classList.add('stop');

        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.addEventListener('result', (event) => this.resultHandler(event));
        this.recognition.start();
        this.transcribing = true;
      }
    }

    stop(){
      let startStopButton = this.shadowRoot.querySelector('#start-stop');
      startStopButton.innerHTML = 'Start Transcript';
      startStopButton.classList.remove('stop');
      this.recognition.stop();
      this.transcribing = false;
    }

    resultHandler(event){
      let transcriptWindow = this.shadowRoot.querySelector('#transcript-window');
      transcriptWindow.innerHTML = '';
      for(const result of event.results){
        this.write(result[0].transcript);
      }
    }

    write(message){
      let transcriptWindow = this.shadowRoot.querySelector('#transcript-window');
      transcriptWindow.insertAdjacentHTML('beforeend', `<p>${message}</p>`);
    }

  }
);


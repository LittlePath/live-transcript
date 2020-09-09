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

    }

    get style(){
      let style = document.createElement('style');
      style.innerHTML = `
        .stop{ 
          background-color: red;
        }
      `;
      return style;
    }

    get content(){
      let content = document.createElement('section');
      content.innerHTML = `
<button id="start-stop">Start Transcript</button> 
      `;

      return content;
    }

    startStopClickHandler(event){
      let startStopButton = this.shadowRoot.querySelector('#start-stop');
      if(startStopButton.innerHTML.startsWith('Start')){
        startStopButton.innerHTML = 'Stop Transcript';
        startStopButton.classList.remove('start');
        startStopButton.classList.add('stop');
      }else{
        startStopButton.innerHTML = 'Start Transcript';
        startStopButton.classList.add('start');
        startStopButton.classList.remove('stop');
      }
    }

  }
);


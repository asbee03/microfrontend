import { LitElement, html, css } from 'lit';
import '@lrnwebcomponents/meme-maker';

const fuecocoPic = new URL('../assets/BaljeetFull.png', import.meta.url).href;

export class CharacterCard extends LitElement {
  static get properties() {
    return {
      Name: {
        type: String, 
      }, 
      Details: {
        type: String,
      },

      topText: {
        type: String, 
      },

      bottomText: {
        type: String,
      },

      nickname: {
        type: String, 
      },

      img: {
        type: String,  
      },
      
    }
  }

  static get styles() {
    return css`
      body {
  background: blue; 
}
.all{
  
  text-align: center;
  padding: 20px;
  border-width: 10px;
  width: 600px;
  max-width: 800px;
  margin: auto;
  background-color: blue;
  margin-top: 50px;
  color: white;
  box-shadow: 0 12px 13px rgba(0,0,0,0.16), 0 12px 13px rgba(0,0,0,0.16);
}
.text { 
  font-size: 16px;
}
.title{
  font-size: 40px;
}
.buttons{
  text-align: center; 
  padding: 50px;
}
.detailButton {
  margin: 1px;
  position: center; 
}
button:hover,
buttons:focus{
  background-color: blue;
}
.picture {
  width: 400px;
  align-items: center;
}
@media (min-width: 500px) and (max-width: 800px) {
    
    .detailButton {
      display: none;
    }
  }
@media (max-width: 500px) {
  .all{
    transform: scale(0.8);
  }
}
    `;
  }

  constructor() { 
    super();
    this.Name = "BALJEET";
    this.Details = "Baljeet is what every brown person aspires to be!"
    this.img = "https://i.redd.it/zckxgrywjpk61.jpg"
  }


  toggleEvent(e){
    console.log(this.shadowRoot.querySelector('details').getAttribute('open'));
    const state=this.shadowRoot.querySelector('details').getAttribute('open') === '' ? true : false;
    
    console.log(state);
    this.opened=state;
  }


updated(changedProperties){
  changedProperties.forEach((oldValue,propName) => {
    if(propName==="opened"){
      this.dispatchEvent(new CustomEvent('opened-changed',{
        composed: true,
        bubbles: true,
        cancelable: true,
        detail:{
          value: this[propName]
        }
      }))
      
    }
  });
}

  render() {
    return html`
  <div class="all">
  <h1 class="title">
  ${this.Name}
</h1>
<h2 class="nickname">
${this.nickname}
</h2>

  <img src="${this.img}">
  
  <details class="details" .open='${this.open}' @toggle=${this.toggleEvent}>
  <summary>Character Details</summary>
  <p class ="text">
    ${this.Details}
  </p>
</details>

  <slot name = "img"></slot>
</div>
    `;
  }
}

customElements.define('character-card', CharacterCard);
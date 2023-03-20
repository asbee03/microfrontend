import { LitElement, html, css } from 'lit';
import "./character-card.js";

export class TeamRoster extends LitElement{

    static get tag(){
    return 'team-roster';
    }

    static get properties() {
        return{
            players: {type: Array},
            team: {type: String},
        }
    }

    constructor(){
        super();
        this.players = [];
        this.team = "Character Team";
        this.updateRoster();
    }

    updateRoster(){
        const address = new URL('../api/roster.js', import.meta.url).href;
        fetch(address).then((response) => {
            if (response.ok){
                return response.json()
            }
            return [];
        })

        .then((data) => {
            this.players = data;
        });
    }

    static get styles(){
        return css`
        :host{
            display: block;
        }
        .wrapper{
            border: 2px solid black;
            display: flex;
        }
        .item{
            display: inline-flex;
        }
        `;
    }

    render(){
        return html`
        <h2> ${this.team}</h2>
        <div class="wrapper">
            ${this.players.map(player => html`
            <div class="item">
                <character-card name="${player.Name}" details="${player.Details}" nickname="${player.nickname}" img="${player.img}"></character-card>
            </div>
            `)}
        </div>
        `
    }


}

customElements.define(TeamRoster.tag, TeamRoster);




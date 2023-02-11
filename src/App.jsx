import { Component } from "react";
import React from "react";
// import "./App.css";
import Messages from "./Messages";
import Input from "./Input";

// funkcije koje generiraju ime i boju avatara
const randomName = () => {
    const adjectives = [
        "autumn",
        "hidden",
        "bitter",
        "misty",
        "silent",
        "empty",
        "dry",
        "dark",
        "summer",
        "icy",
        "delicate",
        "quiet",
        "white",
        "cool",
        "spring",
        "winter",
        "patient",
        "twilight",
        "dawn",
        "crimson",
        "wispy",
        "weathered",
        "blue",
        "billowing",
        "broken",
        "cold",
        "damp",
        "falling",
        "frosty",
        "green",
        "long",
        "late",
        "lingering",
        "bold",
        "little",
        "morning",
        "muddy",
        "old",
        "red",
        "rough",
        "still",
        "small",
        "sparkling",
        "throbbing",
        "shy",
        "wandering",
        "withered",
        "wild",
        "black",
        "young",
        "holy",
        "solitary",
        "fragrant",
        "aged",
        "snowy",
        "proud",
        "floral",
        "restless",
        "divine",
        "polished",
        "ancient",
        "purple",
        "lively",
        "nameless",
    ];
    const nouns = [
        "waterfall",
        "river",
        "breeze",
        "moon",
        "rain",
        "wind",
        "sea",
        "morning",
        "snow",
        "lake",
        "sunset",
        "pine",
        "shadow",
        "leaf",
        "dawn",
        "glitter",
        "forest",
        "hill",
        "cloud",
        "meadow",
        "sun",
        "glade",
        "bird",
        "brook",
        "butterfly",
        "bush",
        "dew",
        "dust",
        "field",
        "fire",
        "flower",
        "firefly",
        "feather",
        "grass",
        "haze",
        "mountain",
        "night",
        "pond",
        "darkness",
        "snowflake",
        "silence",
        "sound",
        "sky",
        "shape",
        "surf",
        "thunder",
        "violet",
        "water",
        "wildflower",
        "wave",
        "water",
        "resonance",
        "sun",
        "wood",
        "dream",
        "cherry",
        "tree",
        "fog",
        "frost",
        "voice",
        "paper",
        "frog",
        "smoke",
        "star",
    ];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return adjective + noun;
};
// Generiranje random hex broja za boju avatara
const randomColor = () => {
    return "#" + Math.floor(Math.random() * 0xffffff).toString(16) + "66";
};
// Generiranje random broja za avatar tipa avatarBR.png
const randomAvatar = (min, max) => {
    const rndInt = Math.floor(Math.random() * (max - min + 1)) + min;
    return "url('/images/avatar" + rndInt.toString() + ".png')";
};

class App extends Component {
    state = {
        messages: [],
        member: {
            username: randomName(),
            color: randomColor(),
            avatar: randomAvatar(1, 9),
        },
    };
    // Pokretanje nove instance Scaledrone-a (dodali ID stvorenog kanala - channel ID)
    constructor() {
        super();
        this.drone = new window.Scaledrone("bJcLIp1mbWHYWdCS", {
            data: this.state.member,
        });
    }

    render() {
        return (
            <div className="container app">
                <div className="row">
                    <div className="col">
                        <h1 className="text-center py-2">Lets chat!</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="messages-list">
                            <Messages
                                messages={this.state.messages}
                                currentMember={this.state.member}
                            />
                            <div className="bottom"></div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Input onSendMessage={this.onSendMessage} />
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.drone.on("open", (error) => {
            if (error) {
                return console.error(error);
            }
            const member = { ...this.state.member };
            member.id = this.drone.clientId;
            this.setState({ member });
        });

        // Pretplata na sobu - prefiks observable (vidljiva) omogućava da poruke imaju spremmljene podatke o pošiljatelju, vidi: https://www.scaledrone.com/docs/api-clients/observable-rooms
        const room = this.drone.subscribe("observable-room");

        // Da bi znali kada stižu poruke moramo se pretplatiti na podatke u sobi. Kad dođe nova poruka dodat ćemo tekst poruke i podatke o pošiljatelju u naš state.  Uz pomoć onSendMessage ćemo objaviti novu poruku svima u sobi (vidi dolje funkciju)
        room.on("data", (data, member) => {
            const messages = this.state.messages;
            messages.push({ member, text: data });
            this.setState({ messages });
        });
    }

    // Skrolanje na dno poruka da se uvijek vidi ona zadnja
    componentDidUpdate() {
        document.querySelector(".bottom").scrollIntoView();
    }

    // Objava nove poruke (vidi gore) svima u sobi
    onSendMessage = (message) => {
        this.drone.publish({
            room: "observable-room",
            message,
        });
    };
}

export default App;

import { Component } from "react";

class Input extends Component {
    // Ovdje pratimo trenutno stanje unešenog teksta
    state = {
        text: "",
    };

    // Kadgod se vrijednost u input polju promijeni, mijenja se stanje naše komponente
    onChange(e) {
        this.setState({ text: e.target.value });
    }
    // Ova funkcija upravlja slanjem poruke. Defaultno ponašanje moramo spriječiti da se naša aplikacija nebi osvježava svaki put kad pošaljemo poruku.
    onSubmit(e) {
        e.preventDefault();
        this.setState({ text: "" });
        this.props.onSendMessage(this.state.text);
    }

    // Ovdje unosimo tekst preko forme s input poljem i button-om
    render() {
        return (
            <form
                className="input-group mt-3"
                onSubmit={(e) => this.onSubmit(e)}
            >
                <input
                    onChange={(e) => this.onChange(e)}
                    value={this.state.text}
                    type="text"
                    placeholder="Enter you message here and press enter or send button"
                    autoFocus={true}
                    className="form-control"
                />
                <button className="btn btn-secondary">Send</button>
            </form>
        );
    }
}

export default Input;

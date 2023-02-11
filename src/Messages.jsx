import { Component } from "react";

// Komponenta preko propsa iz App dobiva poruke i vraća listu poruka. Svaka stavka u listi ima ime, avatar i tekst poruke.
class Messages extends Component {
    render() {
        const { messages } = this.props;
        return <ul>{messages.map((m) => this.renderMessage(m))}</ul>;
    }
    // Ispis pojedine stavke odrađuje renderMessage funkcija
    renderMessage = (message) => {
        const { member, text } = message;
        const { currentMember } = this.props;
        const messageFromMe = member.id === currentMember.id;
        const className = messageFromMe ? "messages-message currentMember" : "messages-message";
        return (
            <li
                key={(Math.random() * 10).toString(36).replace(".", "")}
                className={className}
            >
                <span
                    className="avatar"
                    style={{
                        backgroundColor: member.clientData.color,
                        backgroundImage: member.clientData.avatar,
                        backgroundSize: "contain",
                    }}
                />
                <div className="message-content">
                    <div className="username">{member.clientData.username}</div>
                    <div className="text">{text}</div>
                </div>
            </li>
        );
    };
}

export default Messages;

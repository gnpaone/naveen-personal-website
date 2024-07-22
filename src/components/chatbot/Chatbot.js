import React, { Component } from "react";
import MediaQuery from "react-responsive";
import Cookies from "universal-cookie";
import { v4 as uuid } from "uuid";
import Message from "./Message";
import Card from "./Card";
import messageSound from './../../assets/open-ended.mp3';
import '../../css/components/Chatbot.css';

//Creating cookie for unique session for DialogFlow
const cookies = new Cookies();

class Chatbot extends Component {
  // Creating react references to elements
  messagesEnd;
  chatInput;

  constructor(props) {
    super(props);
    this.infoRefs = {};
    this.hoverBoxRef = React.createRef();
    this.state = {
      messages: [],
      showBot: false,
      welcomeSent: false,
      botName: 'Chatbot',
      hoverBoxClass: 'min',
      isHovered: false
    };
    
    this.sound = new Audio(messageSound);
    
    //Setting the cookie using uuid
    if (!cookies.get("userID")) {
      cookies.set("userID", uuid(), { path: "/" });
    }

    //Binding event listeners
    this.toggleBot = this.toggleBot.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
  }

  resolveAfterXSeconds(time) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(time);
      }, time * 1000);
    });
  }

  async componentDidMount() {
    if(!this.state.welcomeSent) {
      await this.resolveAfterXSeconds(1.2);
      this.df_event_query("WELCOME_TO_SITE");
      this.setState({ welcomeSent: true, showBot: false }); /* showBot: true <-initial code */
    }
    this.updateHoverBoxPosition();
    window.addEventListener('resize', this.updateHoverBoxPosition);
  }

  // Scroll to latest message on updation of state
  componentDidUpdate(prevProps, prevState) {
    if(this.state.showBot) {
      this.messagesEnd.scrollIntoView({ behaviour: "smooth" });
    }
    if (this.chatInput) {
      this.chatInput.focus();
    }
    if (prevState.hoverBoxClass !== this.state.hoverBoxClass || prevState.isHovered !== this.state.isHovered) {
      this.updateHoverBoxPosition();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateHoverBoxPosition);
  }

  updateHoverBoxPosition = () => {
    const infoElement = this.infoRefs[this.state.hoverBoxClass]?.current;
    const hoverBoxElement = this.hoverBoxRef.current;
    if (infoElement && hoverBoxElement) {
      const infoRect = infoElement.getBoundingClientRect();
      const hoverBoxRect = hoverBoxElement.getBoundingClientRect();
      const hoverBoxLeft = infoRect.left + infoRect.width * 5 / 8 - hoverBoxRect.width / 2;
      hoverBoxElement.style.left = `${hoverBoxLeft}px`;
    }
  };

  //Function to send text query to server
  async df_text_query(text) {
    let says = {
      speaks: "me",
      message: {
        text: {
          text
        }
      }
    };
    this.setState({
      messages: [...this.state.messages, says]
    });

    const response = await fetch("https://chatbot-server-indol.vercel.app/api/df_text_query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text,
        userID: cookies.get("userID")
      })
    });

    const res = await response.json();
 
    if (res.action === 'input.whoAreYou' && res.allRequiredParamsPresent) {
      this.setState({botName: res.parameters.fields.name.stringValue});
    }

    res.fulfillmentMessages.forEach(message => {
      says = {
        speaks: "bot",
        message
      };
      this.setState({
        messages: [...this.state.messages, says]
      });
    });
    

    this.sound.play();
  }

  // Function to send event query to server
  async df_event_query(event) {
    const response = await fetch("https://chatbot-server-indol.vercel.app/api/df_event_query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        event,
        userID: cookies.get("userID")
      })
    });

    const res = await response.json();
    // Iterating over all the responeses in the the request response
    // because the chatbot can have multiple responses for a single phrase
    for (let msg of res.fulfillmentMessages) {
      let says = {
        speaks: "bot",
        message: msg
      };
      this.setState({ messages: [...this.state.messages, says] });
    }
    this.sound.play();
  }

  //Helper functions
  isNormalMessage(message) {
    return message.message && message.message.text && message.message.text.text;
  }

  isMessageCard(message) {
    return (
      message.message &&
      message.message.payload &&
      message.message.payload.fields &&
      message.message.payload.fields.cards
    );
  }

  // RENDER FUNCTIONS
  renderCards(cards) {
    return cards.map((card, i) => <Card key={i} payload={card.structValue} />);
  }

  renderOneMessage(message, i) {
    if (this.isNormalMessage(message)) {
      return (
          <Message
            key={i}
            speaks={message.speaks}
            text={message.message.text.text}
          />
      );
    } else if (this.isMessageCard(message)) {
      return (
        <div key={i}>
          <div className="container">
            <div
              style={{
                height: 200,
                width:
                  message.message.payload.fields.cards.listValue.values.length * 150,
                paddingLeft: '12%'
              }}
            >
              {this.renderCards(
                message.message.payload.fields.cards.listValue.values
              )}
            </div>
          </div>
        </div>
      );
    }
  }

  //Renders all the messages
  renderMessages(stateMessages) {
    if (stateMessages) {
      return stateMessages.map((message, i) => {
        return this.renderOneMessage(message, i);
      });
    }
    return null;
  }

  toggleBot() {
    this.setState({ showBot: !this.state.showBot });
    this.setState(prevState => ({
      hoverBoxClass: prevState.hoverBoxClass === 'min' ? 'open' : 'min'
    }));
  }

  handleMouseOver() {
    this.setState({ isHovered: !this.state.isHovered });
  }

  handleMouseOut() {
    this.setState({ isHovered: !this.state.isHovered });
  }

  // EVENT LISTENERS
  _handleInputKeyPress(e) {
    if (e.key === "Enter" && e.target.value !== "") {
      this.df_text_query(e.target.value);
      e.target.value = "";
    }
  }

  render() {
    const { showBot, botName } = this.state;

    if (showBot) {
      return (
        <>
          <MediaQuery minWidth={600}>
            <div id="hoverBox" style={{ display: this.state.isHovered ? 'flex' : 'none' }} className={`chatbubble hover-box ${this.state.hoverBoxClass}`} ref={this.hoverBoxRef}>
              <span style={{ paddingTop: "11px", color: "#doefff" }}>You can try asking him questions about me, my hobbies, my skills etc. You can also ask the bot for its name and have small talk to it. I'll add more training phrases whenever I find some time. Don't forget to say bye before leaving ;D</span>
              <div className="chatbubble-arrow"></div>
            </div>
            <div
              style={{
                borderRadius: "15px 15px 0 0",
                opacity: 0.8,
                paddingTop: "20px",
                paddingBottom: "8px",
                backgroundColor: "#000f23",
                height: 500,
                width: 450,
                position: "fixed",
                bottom: 0,
                right: 0,
                zIndex: 1000
              }}
            >
              <nav>
                <div id="chatwindow-nav" className="nav-wrapper">
                  <span ref={this.infoRefs.open = React.createRef()}>{ botName }<span className="info" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}><svg width="21px" height="21px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 11V13C5.5 16.3137 8.18629 19 11.5 19H13.5C16.8137 19 19.5 16.3137 19.5 13V11C19.5 7.68629 16.8137 5 13.5 5H11.5C8.18629 5 5.5 7.68629 5.5 11Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.5 12V16" stroke="#000000" stroke-width="1.5" stroke-linecap="round"/><path d="M12.5 9.5C12.2243 9.5 12 9.2757 12 9C12 8.7243 12.2243 8.5 12.5 8.5C12.7757 8.5 13 8.7243 13 9C13 9.2757 12.7757 9.5 12.5 9.5Z" fill="#000000"/><path d="M12.5 8C13.0523 8 13.5 8.44772 13.5 9C13.5 9.55228 13.0523 10 12.5 10C11.9477 10 11.5 9.55228 11.5 9C11.5 8.44772 11.9477 8 12.5 8Z" fill="#000000"/></svg></span></span>
                  <span className="close" onClick={this.toggleBot}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg></span>
                </div>
              </nav>
              <div
                id="chatbot"
                style={{ height: '375px', width: "100%", overflow: "auto", backgroundColor: "#000f23" }}
              >
                {this.renderMessages(this.state.messages)}
                <div
                  ref={el => {
                    this.messagesEnd = el;
                  }}
                  style={{ float: "left", clear: "both" }}
                />
              </div>
                <input
                  type="text"
                  ref={input => {
                    this.chatInput = input;
                  }}
                  style={{
                    fontFamily: 'Spartan',
                    paddingLeft: '1%',
                    paddingRight: '1%',
                    width: '98%',
                    backgroundColor: "#000f23",
                    color: "#61d3a3",
                    borderTop: '1px solid lightgrey',
                    marginBottom: 0
                  }}
                  placeholder="Start talking to the bot!"
                  onKeyPress={this._handleInputKeyPress}
                />
              
            </div>
          </MediaQuery>
          <MediaQuery maxWidth={600}>
            <div
              style={{
                borderRadius: "15px 15px 0 0",
                opacity: 0.8,
                paddingTop: "20px",
                paddingBottom: "20px",
                backgroundColor: "#000f23",
                height: "auto",
                width: "100dvw",
                position: "fixed",
                bottom: 0,
                zIndex: 1000
              }}
            >
              <nav>
                <div id="chatwindow-nav" className="nav-wrapper">
                  <span>{ botName }</span>
                  <span className="close" onClick={this.toggleBot}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg></span>
                </div>
              </nav>
              <div
                id="chatbot"
                style={{ height: '375px', width: "100%", overflow: "auto", backgroundColor: "#000f23" }}
              >
                {this.renderMessages(this.state.messages)}
                <div
                  ref={el => {
                    this.messagesEnd = el;
                  }}
                  style={{ float: "left", clear: "both" }}
                />
              </div>
                <input
                  type="text"
                  ref={input => {
                    this.chatInput = input;
                  }}
                  style={{
                    fontFamily: 'Spartan',
                    paddingLeft: '1%',
                    paddingRight: '1%',
                    width: '98%',
                    backgroundColor: "#000f23",
                    color: "#61d3a3",
                    borderTop: '1px solid lightgrey',
                    marginBottom: 0
                  }}
                  placeholder="Start talking to the bot!"
                  onKeyPress={this._handleInputKeyPress}
                />
              
            </div>
          </MediaQuery>
        </>
      );
    } else {

      return (
        <>
          <MediaQuery minWidth={600}>
            <div id="hoverBox" style={{ display: this.state.isHovered ? 'flex' : 'none' }} className={`chatbubble hover-box ${this.state.hoverBoxClass}`} ref={this.hoverBoxRef}>
              <span style={{ paddingTop: "11px", color: "#doefff" }}>You can try asking him questions about me, my hobbies, my skills etc. You can also ask the bot for its name and have small talk to it. I'll add more training phrases whenever I find some time. Don't forget to say bye before leaving ;D</span>
              <div className="chatbubble-arrow"></div>
            </div>
            <div
              style={{
                borderRadius: "15px 15px 0 0",
                opacity: 0.8,
                paddingTop: "14px",
                paddingBottom: "14px",
                backgroundColor: "#000f23",
                width: 450,
                position: "fixed",
                bottom: 0,
                right: 0,
                zIndex: 1000
              }}
            >
              <nav>
                <div id="chatwindow-nav" className="nav-wrapper">
                  <span ref={this.infoRefs.min = React.createRef()}>{ botName }<span className="info" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}><svg width="21px" height="21px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 11V13C5.5 16.3137 8.18629 19 11.5 19H13.5C16.8137 19 19.5 16.3137 19.5 13V11C19.5 7.68629 16.8137 5 13.5 5H11.5C8.18629 5 5.5 7.68629 5.5 11Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.5 12V16" stroke="#000000" stroke-width="1.5" stroke-linecap="round"/><path d="M12.5 9.5C12.2243 9.5 12 9.2757 12 9C12 8.7243 12.2243 8.5 12.5 8.5C12.7757 8.5 13 8.7243 13 9C13 9.2757 12.7757 9.5 12.5 9.5Z" fill="#000000"/><path d="M12.5 8C13.0523 8 13.5 8.44772 13.5 9C13.5 9.55228 13.0523 10 12.5 10C11.9477 10 11.5 9.55228 11.5 9C11.5 8.44772 11.9477 8 12.5 8Z" fill="#000000"/></svg></span></span>
                  <span className="close" onClick={this.toggleBot}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/></svg></span>
                </div>
              </nav>
            </div>
          </MediaQuery>
          <MediaQuery maxWidth={600}>
            <div
              style={{
                borderRadius: "15px 15px 0 0",
                opacity: 0.8,
                paddingTop: "14px",
                paddingBottom: "14px",
                backgroundColor: "#000f23",
                position: "fixed",
                bottom: 0,
                right: "14px",
                zIndex: 1000
              }}
            >
              <nav>
                <div id="chatwindow-nav" className="nav-wrapper">
                  <span className="close" onClick={this.toggleBot}><svg fill="#000000" width="42px" height="42px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9,15a1,1,0,1,0,1,1A1,1,0,0,0,9,15ZM2,14a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V15A1,1,0,0,0,2,14Zm20,0a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V15A1,1,0,0,0,22,14ZM17,7H13V5.72A2,2,0,0,0,14,4a2,2,0,0,0-4,0,2,2,0,0,0,1,1.72V7H7a3,3,0,0,0-3,3v9a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V10A3,3,0,0,0,17,7ZM13.72,9l-.5,2H10.78l-.5-2ZM18,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V10A1,1,0,0,1,7,9H8.22L9,12.24A1,1,0,0,0,10,13h4a1,1,0,0,0,1-.76L15.78,9H17a1,1,0,0,1,1,1Zm-3-4a1,1,0,1,0,1,1A1,1,0,0,0,15,15Z"/></svg></span>
                </div>
              </nav>
            </div>
          </MediaQuery>
        </>
      );
    }
  }
}

export default Chatbot;

import React, { useState, useEffect } from "react";
import queryString from "query-string";
import InfoBar from "../InfoBar/InfoBar";
import Messages from "../Messages/Messages";
import io from "socket.io-client";
import Input from "../Input/Input";
import "emoji-mart/css/emoji-mart.css";
import onlineIcon from "../../icons/onlineIcon.png";
import Fade from "react-reveal/Fade";
import { CopyToClipboard } from "react-copy-to-clipboard";

import "./Chat.css";

let socket;
let timeout = undefined;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState("");
  const [isEmoji, setIsEmoji] = useState(false);
  const [msg, setMsg] = useState("");
  const [typingUser, setTypingUser] = useState("");
  const [isToggle, setIsToggle] = useState(false);
  const [isCopied, setIsCopied] = useState("");

  // const ENDPOINT = "https://buzz-and-go.herokuapp.com/";
  const ENDPOINT = "http://localhost:5000/"

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, (error) => {
      console.log(error);
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    //for istyping
    socket.on("display", (data) => {
      if (data.typing === true) {
        setIsTyping(true);
        setTypingUser(data.user);
      } else {
        setIsTyping(false);
      }
    });

    socket.on("roomData", ({ users, room }) => {
      setUsers(users);
    });
  }, [messages, name]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      // message.time = new Date().toISOString();
      setIsTyping(false);
      socket.emit(
        "sendMessage",
        {
          message: message,
          time: new Date().getHours() + ":" + new Date().getMinutes(),
        },
        () => setMessage("")
      );
    }
  };

  // for emoji
  const handleEmoji = () => {
    setIsEmoji(!isEmoji);
  };
  const addEmoji = (emoji) => {
    const text = `${msg}${emoji.native}`;
    setMsg(text);
    setMessage(text);
    // setIsEmoji(false)
  };

  //for typing
  const typingTimeout = () => {
    socket.emit("typing", { user: name, typing: false });
    setIsTyping(false);
  };
  const handleKeydown = (e) => {
    if (e.keyCode !== 13) {
      socket.emit("typing", { user: name, typing: true });
      clearTimeout(timeout);
      timeout = setTimeout(typingTimeout, 4000);
    } else {
      clearTimeout(timeout);
      typingTimeout();
    }
  };
  //for copying
  const handleCopy = (e) => {
    setIsCopied(e);
    setTimeout(() => {
      setIsCopied("");
    }, 3000);
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} setIsToggle={setIsToggle} isToggle={isToggle} />

        {isToggle ? (
          users ? (
            <Fade right cascade>
              <div className={`onlinePeople ${isToggle ? "" : ""}`}>
                <h2>
                  {users.map(({ name }) => (
                    <div key={name} className="activeItem">
                      {name}
                      <img alt="Online Icon" src={onlineIcon} />
                    </div>
                  ))}
                </h2>
                <CopyToClipboard
                  text={`Hey! Let's chat on https://buzz-and-go.herokuapp.com/. Join my temporary room "${room}" and we're good to go.`}
                >
                  <button
                    className={
                      isCopied === "invite" ? "copiedBtn" : "inviteBtn"
                    }
                    onClick={() => handleCopy("invite")}
                  >
                    {isCopied === "invite" ? "Copied!" : "Invite link"}
                  </button>
                </CopyToClipboard>
              </div>
            </Fade>
          ) : null
        ) : null}

        <Messages messages={messages} name={name} />

        {/* {(isEmoji) ? (<Picker set='apple'
          onSelect={addEmoji}
          title='Pick your emoji…' emoji='point_up'
          style={{ position: 'relative' }}
          i18n={{ search: 'Recherche', categories: { search: 'Résultats de recherche', recent: 'Récents' } }} />) : (null)} */}
        {name === typingUser ? null : isTyping ? (
          <h5 className="typingMsg">{typingUser} is typing..</h5>
        ) : null}
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          handleEmoji={handleEmoji}
          setIsEmoji={setIsEmoji}
          msg={msg}
          setMsg={setMsg}
          handleKeydown={handleKeydown}
          isEmoji={isEmoji}
          addEmoji={addEmoji}
        />
      </div>
    </div>
  );
};

export default Chat;

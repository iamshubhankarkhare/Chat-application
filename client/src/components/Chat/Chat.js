import React, { useState, useEffect } from "react";
import queryString from "query-string";
import InfoBar from "../InfoBar/InfoBar";
import Messages from "../Messages/Messages";
import TextContainer from '../TextContainer/TextContainer';
import io from "socket.io-client";
import Input from "../Input/Input";
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { Link } from 'react-router-dom'
import Join from '../Join/Join'



import "./Chat.css";

let socket;
let timeout = undefined;


const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [isTyping, setIsTyping] = useState(false)
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState('');
  const [isEmoji, setIsEmoji] = useState(false)
  const [msg, setMsg] = useState('')
  const [typingUser, setTypingUser] = useState("")



  const ENDPOINT = "http://localhost:5000/";

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
    socket.on('display', (data) => {
      if (data.typing === true) {
        setIsTyping(true)
        setTypingUser(data.user)
      }
      else {
        setIsTyping(false)
      }
    })

    socket.on("roomData", ({ users, room }) => {
      setUsers(users);
    });
  }, [messages, name]);


  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      setIsTyping(false)
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  // for emoji
  const handleEmoji = () => {
    setIsEmoji(!isEmoji)
  }
  const addEmoji = (emoji) => {
    const text = `${msg}${emoji.native}`
    setMsg(text)
    setMessage(text);
    // setIsEmoji(false)
  }

  //for typing
  const typingTimeout = () => {
    socket.emit('typing', { user: name, typing: false })
    setIsTyping(false)
  }
  const handleKeydown = (e) => {
    if (e.keyCode !== 13) {
      socket.emit('typing', { user: name, typing: true })
      clearTimeout(timeout)
      timeout = setTimeout(typingTimeout, 4000)
    }
    else {
      clearTimeout(timeout)
      typingTimeout()

    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />

        <Messages messages={messages} name={name} />
        {(isEmoji) ? (<Picker set='apple'
          onSelect={addEmoji}
          title='Pick your emoji…' emoji='point_up'
          style={{ position: 'relative', bottom: '0%' }}
          i18n={{ search: 'Recherche', categories: { search: 'Résultats de recherche', recent: 'Récents' } }} />) : (null)}
        {(name === typingUser ? (null) : (isTyping ? (<h5>{typingUser} is typing..</h5>) : (null)))}
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          handleEmoji={handleEmoji}
          setIsEmoji={setIsEmoji}
          msg={msg}
          setMsg={setMsg}
          handleKeydown={handleKeydown}
        />
      </div>
      {/* <TextContainer users={users} /> */}
    </div>
  );
};

export default Chat;

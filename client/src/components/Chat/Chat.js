import React, { useState, useEffect } from "react";
import queryString from "query-string";
import InfoBar from "../InfoBar/InfoBar";
import Messages from "../Messages/Messages";
import TextContainer from '../TextContainer/TextContainer';
import io from "socket.io-client";
import Input from "../Input/Input";
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'


import "./Chat.css";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState('');
  const [isEmoji, setIsEmoji] = useState(false)
  const [msg, setMsg] = useState('')


  const ENDPOINT = "http://localhost:5000/";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);
    console.log(socket);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages]);


  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  const handleEmoji = () => {
    setIsEmoji(!isEmoji)
  }
  const addEmoji = (emoji) => {
    const text = `${msg}${emoji.native}`
    setMsg(text)
    setMessage(text);
    // setIsEmoji(false)
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
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          handleEmoji={handleEmoji}
          setIsEmoji={setIsEmoji}
          msg={msg}
          setMsg={setMsg}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;

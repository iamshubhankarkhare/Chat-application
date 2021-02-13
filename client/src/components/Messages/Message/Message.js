import React from "react";

import "./Message.css";
import ReactEmoji from "react-emoji";

const Message = ({ message: { text, user, time, img}, name }) => {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();
  console.log(img)
  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    
    <div className="messageContainer justifyEnd">
      {(!img)?(<span></span>):(<img src={img}></img>)}
      <p className="sentText pr-10">{trimmedName}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
        <span className="timeStamp">{time}</span>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      {(!img)?(<span></span>):(<img src={img}></img>)}
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
        <span className="timeStamp">{time}</span>
      </div>
      <p className="sentText pl-10 ">{user}</p>
    </div>
  );
};

export default Message;

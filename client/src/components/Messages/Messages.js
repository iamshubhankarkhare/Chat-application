
import React, { Fragment } from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';
import Pulse from 'react-reveal/Slide';

import Message from './Message/Message';


import './Messages.css';

const Messages = ({ messages, name }) => {
  return (


    <Fragment>
      <ScrollToBottom className="messages">
        {messages.map((message, i) => <div key={i}>{i === messages.length - 1 ? (<Pulse left><Message message={message} name={name} /></Pulse>) : (<Message message={message} name={name} />)}</div>)}
      </ScrollToBottom>
    </Fragment>

  );
}

export default Messages;

import React, { Fragment } from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';


import './Messages.css';

const Messages = ({ messages, name }) => {
  
  return (


    <Fragment>
      <ScrollToBottom className="messages">
        {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
      </ScrollToBottom>
    </Fragment>

  );
}

export default Messages;
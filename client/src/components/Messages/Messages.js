
import React, { Fragment } from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';


import styles from './Messages.module.css';

const Messages = ({ messages, name }) => {
  return (


    <Fragment>
      <ScrollToBottom className={styles.messages}>
        {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
      </ScrollToBottom>
    </Fragment>

  );
}

export default Messages;
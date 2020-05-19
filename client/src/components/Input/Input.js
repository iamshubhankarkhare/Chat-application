import React from 'react';
import 'emoji-mart/css/emoji-mart.css'
import { emojiIndex } from 'emoji-mart'
import './Input.css';
import { Smile } from 'react-feather';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';


const Input = ({ setMessage, sendMessage, message, handleEmoji, setIsEmoji, setMsg, handleKeydown }) => {


  const handleInput = (value) => {
    // setIsEmoji(false)

    const text2 = `${value}`
    setMsg(text2)
    setMessage(value)

  }

  return (
    <div>
      <form className="form">
        <button
          type="button"
          className="toggle-emoji"
          onClick={handleEmoji}
        > <Smile /></button>

        <ReactTextareaAutocomplete
          className="input"
          name="newMessage"
          value={message}
          onClick={() => setIsEmoji(false)}
          loadingComponent={() => <span>Loading</span>}
          onKeyPress={event => event.key === 'Enter' ? (event.preventDefault(), sendMessage(event)) : null}
          onKeyDown={(e) => handleKeydown(e)}
          onChange={({ target: { value } }) => handleInput(value)}
          placeholder="Type a message..."
          trigger={{
            ':': {
              dataProvider: token =>
                emojiIndex.search(token).map(o => ({
                  colons: o.colons,
                  native: o.native,
                })),
              component: ({ entity: { native, colons } }) => (
                <div>{`${colons} ${native}`}</div>
              ),
              output: item => `${item.native}`,
            },
          }}
        />


        <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
      </form>
    </div>
  )
}

export default Input



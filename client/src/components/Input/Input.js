import React from 'react';
import 'emoji-mart/css/emoji-mart.css'
import { emojiIndex } from 'emoji-mart'
import './Input.css';
import { Smile } from 'react-feather';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import { Picker } from 'emoji-mart'



const Input = ({ setMessage, sendMessage, message, handleEmoji, setIsEmoji, setMsg, handleKeydown, isEmoji, addEmoji }) => {


  const handleInput = (value) => {
    // setIsEmoji(false)

    const text2 = `${value}`
    setMsg(text2)
    setMessage(value)

  }


  return (
    <div>
      {(isEmoji) ? (<Picker set='apple'
        onSelect={addEmoji}
        title='Pick your emoji…' emoji='point_up'
        style={{ position: 'relative' }}
        emojiSize={20}
        sheetSize={16}
        emojiTooltip={false}
        i18n={{
          search: 'Recherche', categories: {
            search: 'Search Results',
            recent: 'Frequently Used',
          }
        }} />) : (null)}
      <form className="form">
        <button
          type="button"
          className="toggle-emoji"
          onClick={handleEmoji}
        > <Smile /></button>

        <ReactTextareaAutocomplete
          className="input"
          spellCheck="false"
          name="newMessage"
          value={message}
          onClick={() => setIsEmoji(false)}
          loadingComponent={() => <span>Loading</span>}
          onKeyPress={event => event.key === 'Enter' ? (event.preventDefault(), sendMessage(event)) : null}
          onKeyDown={(e) => handleKeydown(e)}
          onChange={({ target: { value } }) => handleInput(value)}
          placeholder="message..."
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



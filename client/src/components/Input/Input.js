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

        <button className="sendButton" onClick={e => sendMessage(e)}>
            <svg stroke="white" fill="green" stroke-width="0" t="1569683742680" viewBox="0 0 1024 1024" version="1.1" height="45px" width="45px" xmlns="http://www.w3.org/2000/svg"><defs></defs>
                <path d="M931.4 498.9L94.9 79.5c-3.4-1.7-7.3-2.1-11-1.2-8.5 2.1-13.8 10.7-11.7 19.3l86.2 352.2c1.3 5.3 5.2 9.6 10.4 11.3l147.7 50.7-147.6 50.7c-5.2 1.8-9.1 6-10.3 11.3L72.2 926.5c-0.9 3.7-0.5 7.6 1.2 10.9 3.9 7.9 13.5 11.1 21.5 7.2l836.5-417c3.1-1.5 5.6-4.1 7.2-7.1 3.9-8 0.7-17.6-7.2-21.6zM170.8 826.3l50.3-205.6 295.2-101.3c2.3-0.8 4.2-2.6 5-5 1.4-4.2-0.8-8.7-5-10.2L221.1 403 171 198.2l628 314.9-628.2 313.2z"></path>
            </svg>
        </button>
      </form>
    </div>
  )
}

export default Input



import React, { useState } from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => {
  const [isToggle, setIsToggle] = useState(true)

  return (

    <div className="textContainer">
      <div id="menu_button">
        <input type="checkbox" id="menu_checkbox" onClick={() => setIsToggle(!isToggle)} />
        <label htmlFor="menu_checkbox" id="menu_label">
          <div id="menu_text_bar"></div>
        </label>
      </div>      {
        isToggle ? (users
          ? (
            <div>
              <h1>People online :</h1>
              <div className="activeContainer">
                <h2>
                  {users.map(({ name }) => (
                    <div key={name} className="activeItem">
                      {name}
                      <img alt="Online Icon" src={onlineIcon} />
                    </div>
                  ))}
                </h2>
              </div>
            </div>
          )
          : null) : (null)
      }
    </div>
  )
};

export default TextContainer;
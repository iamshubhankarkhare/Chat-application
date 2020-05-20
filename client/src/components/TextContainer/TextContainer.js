import React, { useState } from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => {
  const [isToggle, setIsToggle] = useState(true)

  return (

    <div className="textContainer">
      {
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
import React, { Fragment } from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

import './InfoBar.css';

const InfoBar = ({ room, setIsToggle, isToggle }) => {
  return (
    <Fragment>
      <div className="infoBar">
        <div className="leftInnerContainer">
          <div id="menu_button">
            <input type="checkbox" id="menu_checkbox" onClick={() => setIsToggle(!isToggle)} />
            <label htmlFor="menu_checkbox" id="menu_label">
              <div id="menu_text_bar"></div>
            </label>
          </div>
          <img className="onlineIcon" src={onlineIcon} alt="online icon" />
          <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
          <a href="/">
          <svg stroke="white" fill="#FF7F50" stroke-width="0" version="1.1" viewBox="0 0 16 16" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 10v-2h-5v-2h5v-2l3 3zM11 9v4h-5v3l-6-3v-13h11v5h-1v-4h-8l4 2v9h4v-3z"></path>
          </svg>
          </a>
        </div>
      </div>

    </Fragment>
  )
};

export default InfoBar;
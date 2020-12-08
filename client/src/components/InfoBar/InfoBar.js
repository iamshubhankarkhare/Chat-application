import React, { Fragment } from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

import styles from './InfoBar.module.css';

const InfoBar = ({ room, setIsToggle, isToggle }) => {
  return (
    <Fragment>
      <div className={styles.infoBar}>
        <div className={styles.leftInnerContainer}>
          <div id={styles.menu_button}>
            <input type="checkbox" id={styles.menu_checkbox} onClick={() => setIsToggle(!isToggle)} />
            <label htmlFor={styles.menu_checkbox} id={styles.menu_label}>
              <div id={styles.menu_text_bar}></div>
            </label>
          </div>
          <img className={styles.onlineIcon} src={onlineIcon} alt="online icon" />
          <h3>{room}</h3>
        </div>
        <div className={styles.rightInnerContainer}>
          <a href="/"><img src={closeIcon} alt="close icon" /></a>
        </div>
      </div>

    </Fragment>
  )
};

export default InfoBar;
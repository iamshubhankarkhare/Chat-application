import React, { useState, useEffect, useRef } from 'react'
import './Join.css';
import io from "socket.io-client";
import { TweenMax, Power2, Expo } from 'gsap';

let socket;


const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("")
  const [isTaken, setIsTaken] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  let h1Ref = useRef(null);
  let nameRef = useRef(null);
  let roomRef = useRef(null);
  let mybtn = useRef(null);
  let overlay = useRef(null);
  let overlay2 = useRef(null);
  let screen = useRef(null);
  let loginBtn = useRef(null)

  const ENDPOINT = "http://localhost:5000/";
  useEffect(() => {
    socket = io(ENDPOINT);

  }, [ENDPOINT])


  useEffect(() => {
    setLoginError('')
    setIsTaken(false)
    setSubmitting(false)
    setName('')
    setRoom('')

  }, []);

  const handleSubmit = (e) => {
    if (!name || !room) {
      setLoginError("Please fill all the fields")
      setSubmitting(false)
      return
    }
    if (name && room && !loginError) {
      setSubmitting(true)
      TweenMax.to(loginBtn, {
        y: "-150px",
        backgroundColor: "#003459",

      });
      TweenMax.to([h1Ref, nameRef, roomRef], 1.5, {
        opacity: 0
      });
    }
    setTimeout(() => {
      socket.emit("check", { name, room }, (error) => {
        if (error) {
          setLoginError(error.error)
          setIsTaken(true)
          setSubmitting(false)
        }
        if (!error && name && room) {
          window.location.replace(`/chat?name=${name}&room=${room}`)
          setIsTaken(false)
          setLoginError('')
          setSubmitting(false)
        }
      });
    }, 2000);

  }
  const fadeOut = () => {
    console.log("pressed");

    TweenMax.to(mybtn, 2, {
      y: "-100%",
      opacity: 0,
    });

    TweenMax.to(screen, 2, {
      y: "-400%",
      opacity: 0,
      ease: Power2.easeInOut,
      delay: 1,
    });

    TweenMax.from(overlay, 2, {
      ease: Power2.easeInOut,
    });
    TweenMax.to(overlay, 2, {
      delay: 1,
      top: "-110%",
      ease: Expo.easeInOut,
    });

    TweenMax.to(overlay2, 2, {
      delay: 1.5,
      top: "-110%",
      ease: Expo.easeInOut,
    });
  }


  return (
    <div className="joinOuterContainer">
      <div className="overlay" ref={element => { overlay = element }}>
        <p className="screen" ref={element => { screen = element }}>Create a room <br /> or join one
        <br />Chat <br />forget</p>
        <div className="intro">
          <p>Your privacy is our concern.<br />The rooms are temporary.<br />Your chats are not being saved.<br />No authentication required.</p>
          <button className="myBtn" onClick={() => fadeOut()} ref={element => { mybtn = element }}>Get started</button>
        </div>
      </div>
      <div className="overlay-2" ref={element => { overlay2 = element }}></div>
      <div className="joinInnerContainer">
        <h1 className="heading" ref={element => { h1Ref = element }}>Join</h1>
        <div ref={element => { nameRef = element }}>
          {(isTaken || loginError) ? (<h3 className="errorh3">{`${loginError}`}</h3>) : (null)}
          <input placeholder="Name" className="joinInput"
            type="text" required={true}
            onChange={(event) => setName(event.target.value)} />
        </div>
        <div ref={element => { roomRef = element }}>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)}
            onKeyDown={(e) => (e.keyCode === 13) ? (handleSubmit()) : (console.log("null"))} />
        </div>

        <button className={'button mt-20'} type="submit"
          ref={element => { loginBtn = element }}
          onClick={() => handleSubmit()}>
          {submitting ? "Welcome" : "Sign In"}</button>

      </div>
    </div>
  )
}

export default Join

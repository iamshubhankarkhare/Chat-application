import React, { useState, useEffect } from 'react'
import './Join.css';
import io from "socket.io-client";

let socket;


const Join = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("")
  const [isTaken, setIsTaken] = useState(false)
  const [loginError, setLoginError] = useState('')

  const ENDPOINT = "http://localhost:5000/";
  useEffect(() => {
    socket = io(ENDPOINT);

  }, [ENDPOINT])

  const handleSubmit = (e) => {

    socket.emit("check", { name, room }, (error) => {
      if (error) {
        setLoginError(error.error)
        setIsTaken(true)
      }
      if (!name || !room) {
        setLoginError("Please fill all the fields")
      }
      if (!error && name && room) {
        window.location.replace(`/chat?name=${name}&room=${room}`)
        setIsTaken(false)
        setLoginError('')
      }
    });

  }


  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          {isTaken ? (<h3>{`${loginError}`}</h3>) : (null)}
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)}
            onKeyDown={(e) => (e.keyCode === 13) ? (handleSubmit(e)) : (null)} />
        </div>

        <button className={'button mt-20'} type="submit" onClick={(e) => handleSubmit(e)}>Sign In</button>

      </div>
    </div >
  )
}

export default Join

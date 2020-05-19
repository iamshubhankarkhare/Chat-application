import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';
import './App.css'

export default function App() {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
    </Router>
  )
}

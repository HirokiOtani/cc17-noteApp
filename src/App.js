//import logo from './logo.svg';
import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([{ note: "init" }]);
  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await axios.get("/get");
        setNotes(res.data);
        console.log(notes);
      } catch (err) {
        console.error(err);
      }
    }
    fetchNotes();
  }, []);
  console.log(notes);
  return (
    <div className="App">
      <header className="App-header"></header>
      <body>
        <p>test</p>
        <p>{notes[0].note}</p>
      </body>
    </div>
  );
}

export default App;

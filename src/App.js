import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([{ note: "init" }]);
  const [id, setId] = useState(0);
  const [updated, setUpdated] = useState("not updated");

  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await axios.get("/getAll");
        setNotes(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchNotes();
  }, []);
  async function fetchNote(id) {
    try {
      const res = await axios.get("/get/" + id);
      setId(res.data[0].id);
    } catch (err) {
      console.error(err);
    }
  }

  function id2note(id, notes) {
    for (let n of notes) {
      if (n.id === id) return n.note;
    }
  }

  function note2summary(note) {
    let ans = "";
    let i = 0;
    for (const s of note) {
      if (i > 10) {
        ans += "...";
        return ans;
      } else {
        ans += s;
        i++;
      }
    }
  }

  async function deleteNote(id) {
    try {
      await axios.delete("/delete/" + id);
      setId(0);
    } catch (err) {
      console.error(err);
    }
  }

  async function addNote() {
    try {
      await axios.post("/add");
      const res = await axios.get("/getAll");
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function updateNote(id, updated) {
    try {
      await axios.put("/update/" + id + "/" + updated);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="App">
      <header className="App-header"></header>
      <body>
        <h3
          style={{
            position: "relative",
            right: 100,
          }}
        >
          Note App!
        </h3>
        {notes.map((note) => (
          <div>
            <button
              style={{
                width: "100px",
                height: "20px",
                position: "absolute",
                left: 20,
              }}
              onClick={() => {
                fetchNote(note.id);
              }}
            >
              {note2summary(note.note)}
            </button>
            <br></br>
          </div>
        ))}
        <form>
          <textarea
            type="text"
            rows="5"
            placeholder={id2note(id, notes)}
            style={{
              position: "absolute",
              left: 200,
              top: 50,
            }}
            onChange={(e) => {
              setUpdated(e.target.value);
            }}
          >
            {id2note(id, notes)}
          </textarea>
          <button
            style={{
              position: "absolute",
              left: 230,
              top: 160,
            }}
            onClick={() => {
              updateNote(id, updated);
            }}
          >
            Update Note
          </button>
        </form>
        <form>
          <button
            style={{
              position: "absolute",
              left: 230,
              top: 181,
            }}
            onClick={() => {
              addNote();
            }}
          >
            Add Note
          </button>
        </form>
        <form>
          <button
            style={{
              position: "absolute",
              left: 230,
              top: 202,
            }}
            onClick={() => {
              deleteNote(id);
            }}
          >
            Delete Note
          </button>
        </form>

        {/* <p>{notes}</p> */}
      </body>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { NoteModel } from './models/noteModel';
import './App.css';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        // Todo zmienic url na lepszy
        const response = await fetch("api/notes", { method: "GET" })
        const notes = await response.json();

        // Todo sprawdzic czy jak sie zmieni NOTES na inny tekst to bedzie dzialac bo jest podobny do 
        setNotes(notes)
        console.log('aaaa', response);
      } catch (error) {
        console.log(error);
        // Todo poprawic alert
        alert(error)
      }
    }
    loadNotes();
    // egzekfujemy to tylko podczas rozpoczecia fukcji
  }, [])
  
  return (
    <div className="App">
      {JSON.stringify(notes)}
    </div>
  );
}

export default App;

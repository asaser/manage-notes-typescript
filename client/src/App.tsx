import React, { useEffect, useState } from 'react';
import { NoteModel } from './models/noteModel';
import NoteComponent from './components/NoteComponent/NoteComponent';
import { Col, Container, Row } from 'react-bootstrap';

// Todo zrobic tak aby nie było innych w App.tsx komponentow
import styles from "./components/SingleNoteComponent/SingleNoteComponent.module.css"

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        // Todo zmienic url na lepszy
        const response = await fetch("api/notes", { method: "GET" })
        const allNotes = await response.json();

        // Todo sprawdzic czy jak sie zmieni NOTES na inny tekst to bedzie dzialac bo jest podobny do 
        setNotes(allNotes)
        console.log('aaaa', response);
      } catch (error) {
        console.log(error);
        // Todo poprawic alert
        alert(error)
      }
    }
    loadNotes();
    // check to tylko podczas rozpoczecia fukcji
  }, [])
  
  return (
    <Container>
      <Row xs={1} md={2} xl={3} className="g-3">
        {notes.map((note) => ( 
          <Col key={note._id} >

            {/* Todo sprawdzić czy można lepiej nazwać lub inaczej zaimplementwać className bo coś mi nie pasuje w tym */}
            <NoteComponent note={note} className={styles.singleNote} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;

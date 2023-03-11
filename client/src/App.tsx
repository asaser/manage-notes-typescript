import React, { useEffect, useState } from 'react';
import { NoteModel } from './models/noteModel';
import NoteComponent from './components/NoteComponent/NoteComponent';
import { Button, Col, Container, Row } from 'react-bootstrap';
import * as NotesApi from './routes/notesRouters';

// Todo zrobic tak aby nie było innych w App.tsx komponentow
// Todo zrobi porzadek z css plikami
import styles from './styles/SingleNoteComponent.module.css';
import resuableUtils from './styles/resuableUtils.module.css';
import AddEditNoteDialog from './components/AddNoteDialog/AddEditNoteDialog';
import { FaPlus } from 'react-icons/fa'

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showNoteModal, setShowNoteModal] = useState(false);

  // po to aby schowac i pokazac dialog
  const [noteAbleEdit, setNoteAbleEdit] = useState<NoteModel | null>(null)

  useEffect(() => {
    async function loadNotes() {
      try {
        const allNotes = await NotesApi.fetchNotes()
        // Todo sprawdzic czy jak sie zmieni NOTES na inny tekst to bedzie dzialac bo jest podobny do 
        setNotes(allNotes)
      } catch (error) {
        console.log(error);
        // Todo poprawic alert
        alert(error)
      }
    }
    loadNotes();
    // check to tylko podczas rozpoczecia fukcji
  }, []);


  async function deleteNote(deletedNote: NoteModel) {
    try {
      await NotesApi.deleteNote(deletedNote._id);
      setNotes(notes.filter((currentNote) => currentNote._id !== deletedNote._id));
    } catch (error) {
      alert(error)
    }
  }
  
  return (
    <Container>
      <Button
        className={resuableUtils.flexCenter}
        onClick={() => setShowNoteModal(true)}
      >
        <FaPlus />
        New Note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-3">
        {notes.map((note) => ( 
          <Col key={note._id} >
            {/* Todo sprawdzić czy można lepiej nazwać lub inaczej zaimplementwać className bo coś mi nie pasuje w tym */}
            <NoteComponent note={note} className={styles.singleNote} onDeleteNote={deleteNote} onNoteClicked={setNoteAbleEdit} />
          </Col>
        ))}
      </Row>
      {
        // Todo sprobowac nie robic tego za pomocą ... && ... a zrobić to w pliku <AddNote.. /> używając np. show
        // jezeli chce sie zachowac wartosci po zamknieciu popupu wtedy trzeba uzyc SHOW property
        // Todo sprobowac uzyc show property dla zabawy
        showNoteModal && 
        <AddEditNoteDialog 
          onCloseModal = {() => setShowNoteModal(false)} 
          onNoteSave={(newNote) => {
            setNotes([...notes, newNote])
            setShowNoteModal(false)
          }} 
        />
      }

      {noteAbleEdit &&
        <AddEditNoteDialog
          noteEdit = {noteAbleEdit}
          onCloseModal={() => setNoteAbleEdit(null)}
          onNoteSave = {(updatedNote) => {
            setNotes(notes.map(currentNote => currentNote._id === updatedNote._id ? updatedNote : currentNote))
            setNoteAbleEdit(null);
          }}
        />
      }
    </Container>
  );
}

export default App;

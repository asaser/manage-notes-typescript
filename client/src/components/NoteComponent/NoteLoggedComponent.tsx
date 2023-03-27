import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { NoteModel } from "../../models/noteModel";
import * as NotesApi from '../../routes/notesRouters';
import AddEditNoteDialog from "../AddNoteDialog/AddEditNoteDialog";
import NoteComponent from "./NoteComponent";

// Todo przepatrzeć style i poprawić nazewnictwo plików oraz ogolnie stylowanie
import resuableUtils from '../../styles/resuableUtils.module.css';
import styleCard from '../../styles/SingleNoteComponent.module.css';

const NoteLoggedComponent = () => {

    const [notes, setNotes] = useState<NoteModel[]>([]);
    const [showNoteModal, setShowNoteModal] = useState(false);

    // po to aby schowac i pokazac dialog
    const [noteAbleEdit, setNoteAbleEdit] = useState<NoteModel | null>(null)
  
    // notes loading
    const [loadingNotes, setLoadingNotes] = useState(true);
    const [showLoadingErrorNotes, setShowLoadingErrorNotes] = useState(false)

    useEffect(() => {
        async function loadNotes() {
          try {
            setShowLoadingErrorNotes(false);
            setLoadingNotes(true);
            const allNotes = await NotesApi.fetchNotes()
            // Todo sprawdzic czy jak sie zmieni NOTES na inny tekst to bedzie dzialac bo jest podobny do 
            setNotes(allNotes)
          } catch (error) {
            console.log(error);
            // Todo poprawic alert
            setShowLoadingErrorNotes(true);
          } finally {
            setLoadingNotes(false)
          }
        }
        loadNotes();
        // check to tylko podczas rozpoczecia fukcji
      }, []);

      
  // Todo wyczyścić mongoDB database ze starych plików





  async function deleteNote(deletedNote: NoteModel) {
    try {
      await NotesApi.deleteNote(deletedNote._id);
      setNotes(notes.filter((currentNote) => currentNote._id !== deletedNote._id));
    } catch (error) {
      alert(error)
    }
  }

      const notesGrid =
      <Row className={styleCard.notesPage}>
        {notes.map((note) => ( 
          <Col key={note._id} className={styleCard.notesPage}>
            {/* Todo sprawdzić czy można lepiej nazwać lub inaczej zaimplementwać className bo coś mi nie pasuje w tym */}
            <NoteComponent note={note} className={styleCard.singleNote} onDeleteNote={deleteNote} onNoteClicked={setNoteAbleEdit} />
          </Col>
        ))}
      </Row>
    return (
        <>
            <Button
            className={resuableUtils.flexCenter}
            onClick={() => setShowNoteModal(true)}
            >
            <FaPlus />
            New Note
            </Button>

            {loadingNotes && <Spinner animation='border' variant='primary' />}
            {showLoadingErrorNotes && <p>Somethng is wrong with loading notes. Refresh the page</p>}
            {/* jeśli nie ma błędów to wyswietlaja sie notatki */}
            {!loadingNotes && !showLoadingErrorNotes && 
            <>
                {
                notes.length > 0 ? notesGrid : <p>Board is empty of notes</p>
                }
            </>
            }
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
        </>
    );
}
 
export default NoteLoggedComponent;
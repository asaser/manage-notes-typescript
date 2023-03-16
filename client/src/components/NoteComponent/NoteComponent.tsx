import styles from '../../styles/noteComponents.module.css'
import { Card } from 'react-bootstrap';
import { NoteModel } from '../../models/noteModel';
import { formatDate } from '../../utils/formatDate';
import { MdDelete } from "react-icons/md"

interface NoteComponentProps {
    note: NoteModel,
    // możliwość dodania classy aby zmieniac CSS
    className?: string,
    onDeleteNote: (note: NoteModel) => void,
    onNoteClicked: (note: NoteModel) => void,
}

const NoteComponent = ({ note, className, onDeleteNote, onNoteClicked }: NoteComponentProps) => {

    // lepiej zdestruktyryzowac aby nie powtarzac NOTE
    const {
        title,
        text,
        createdAt,
        updatedAt
    } = note;

    let createdUpdatedText: string;

    // Todo mozna pomyslec aby zamiast tego uzywac MEMO hooka poniewaz to za kazdym razem bedzie sie renderowac
    if(updatedAt > createdAt) {
        createdUpdatedText = "Update " + formatDate(updatedAt)
    } else {
        createdUpdatedText = "Created " + formatDate(createdAt)
    }

    return (
        // Todo moze w bootstrap jest mozliwosc jak w material-ui aby uzywac styled i uzywac calych kompnentow jako styli (reg-f)
        <Card 
            className={`${styles.noteCard} ${className}`}
            onClick = {() => onNoteClicked(note)}
        >
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styles.cardTitle}>
                    {title}
                    <MdDelete 
                        className='ms-auto'
                        onClick={(e) => {
                            onDeleteNote(note)
                            e.stopPropagation();
                        }}
                    />
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className='text-muted'>
                {createdUpdatedText}
            </Card.Footer>
        </Card>
    )
}

export default NoteComponent;
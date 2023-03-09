import styles from './NoteComponents.module.css'
import { Card } from 'react-bootstrap';
import { NoteModel } from '../../models/noteModel';
import { formatDate } from '../../utils/formatDate';

interface NoteComponentProps {
    note: NoteModel,
    // możliwość dodania classy aby zmieniac CSS
    className?: string,
}

const NoteComponent = ({ note, className }: NoteComponentProps) => {

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
        <Card className={`${styles.noteCard} ${className}`}>
            <Card.Body className={styles.cardBody}>
                <Card.Title>
                    {title}
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
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NoteModel } from "../../models/noteModel";
import * as NotesApi from '../../routes/notesRouters';
import TextInputField from "../InputField/TextInputField";

interface AddEditNoteDialogProps {
    onCloseModal: () => void;
    onNoteSave: ( note: NoteModel) => void,
    noteEdit?: NoteModel,
}

const AddEditNoteDialog = ({ onCloseModal, onNoteSave, noteEdit } : AddEditNoteDialogProps) => {

    // hook ktory pozwala w latwiejszy sposob laczyc sie z formularzem
    const { register, handleSubmit, formState : { errors, isSubmitting } } = useForm<NotesApi.NoteInput>({
        defaultValues: {
            title: noteEdit?.title || "",
            text: noteEdit?.text || ""
        }
    });

    async function onSubmit(input: NotesApi.NoteInput) {
        try {
            let noteResponse: NoteModel

            if(noteEdit) {
                noteResponse = await NotesApi.updateNote(noteEdit._id, input)
            } else {
                noteResponse = await NotesApi.createNote(input)
            }
            onNoteSave(noteResponse);
        } catch (error) {
            alert(error)
        }
    }

    return ( 
        <Modal show onHide={onCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {noteEdit ? "Edit Note" : "Add Note"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>

                    <TextInputField
                        name="title"
                        label="Title"
                        type="text"
                        placeholder="Title"
                        register={register}
                        registerOptions={{ required: "required" }}
                        error={errors.title}
                    />

                    <TextInputField 
                        name="title"
                        label="Text"
                        as="textarea"
                        rows={5}
                        placeholder="Text"
                        register={register}
                    />
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    type="submit"
                    form="addEditNoteForm"
                    disabled={isSubmitting}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddEditNoteDialog;
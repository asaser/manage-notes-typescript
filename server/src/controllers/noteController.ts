import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import NoteModel from "../models/noteModel";

// Todo ujednilicic CreateNotesStates i UpdateNotesStates
interface CreateNotesStates {
  title?: string;
  text?: string;
}

interface UpdateNotesStates {
  title?: string;
  text?: string;
}

interface UpdateNotesParams {
    noteId: string
}

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notesModel = await NoteModel.find().exec();
    res.status(200).json(notesModel);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;

  try {
    // możemy użyć mongoose.isValidObjectId ponieważ mongo nie jest w stanie
    // sprawdzić findById(noteId) czy już zostało załadowane
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid length of note id");
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(400, "Note not found, invalid note id");
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

// Todo może można zrobić podobnie jak w innym repo używając .SAVE
// Todo zmienić unknow
export const createNotes: RequestHandler<unknown, unknown, CreateNotesStates, unknown> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;

  try {
    if (title === undefined) {
      // Todo może można używać czegość innego niż createHttpError
      throw createHttpError(400, "Missing title in note");
    }

    const newNote = await NoteModel.create({
      title: title,
      text: text,
    });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

export const updateNote: RequestHandler<UpdateNotesParams, unknown, UpdateNotesStates, unknown> = async (req, res, next) => {
    const noteId = req.params.noteId;
    const updateTitle = req.body.title;
    const updatText = req.body.text;

    try {

        // Todo refactor if statement
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid length of note id");
        }

        if (updateTitle === undefined) {
            // Todo może można używać czegość innego niż createHttpError
            throw createHttpError(400, "Missing title in note");
        }

        const note = await NoteModel.findById(noteId).exec();

        if(!note) {
            throw createHttpError(404, "Note not found, invalid note id")
        }
        
        note.title = updateTitle;
        note.text = updatText;

        const updatedNote = await note.save();

        res.status(200).json(updatedNote);
    } catch (error) {
        next(error)
    }
}

export const deleteNote: RequestHandler = async(req, res, next) => {
    const noteId = req.params.noteId;

    try {
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid length of note id");
        }

        // Todo sprawdzic co to exec()
        const note = await NoteModel.findById(noteId).exec();

        if(!note) {
            throw createHttpError(404, "Note not found, invalid note id")
        }

        // Todo sprawdzić różnicę między REMOVE a DELETEONE
        await note.deleteOne();
        
        // nie potrzebujemy JSON ponieważ nie zwracamy nic do BODY
        // sam status nie wysyła response a robi za niego JSON. Dlatego lepiej używać sendStatus jeśli nic nie mamy do wysłania
        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
}

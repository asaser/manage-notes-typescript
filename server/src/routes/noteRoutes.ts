// Todo tutaj moze byc sporo importow wiec mozna  uzyc -- * as NotesControllers
import { getNotes, getNote, createNotes, updateNote, deleteNote } from "../controllers/noteController"
import express from "express";

const router = express.Router();

router.get("/", getNotes);

router.get("/:noteId", getNote);

router.post("/", createNotes);

router.patch("/:noteId", updateNote);

router.delete("/:noteId", deleteNote);

export default router;
import { NoteModel } from "../models/noteModel";

// Todo stworzyc osobny plik z interface aby wszystkie pliki mogly do niego sie odwolac i nie powielac sie
export interface NoteInput {
    title: string,
    text?: string
}

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init)
    if(response.ok) {
        return response
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;

        throw Error(errorMessage);
    }
}

// Todo moze jakies sprawdzania bledow zrobic
export async function fetchNotes(): Promise<NoteModel[]> {
    const response = await fetchData("api/notes/", { method: "GET" })
    return response.json();
}

export async function createNote(noteData: NoteInput): Promise<NoteModel> {
    const response = await fetchData("api/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
    });
    return response.json();
}

export async function updateNote(noteId: string, note: NoteInput): Promise<NoteModel> {
    const response = await fetchData("api/notes/" + noteId, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    });
    return response.json();
}

export async function deleteNote(noteId: string) {
    await fetchData("api/notes/" + noteId, {
        method: "DELETE"
    })
}
import { NoteModel } from "../models/noteModel";
import { UserModel } from "../models/userModel";

// Todo stworzyc osobny plik z interface aby wszystkie pliki mogly do niego sie odwolac i nie powielac sie

export interface SignUpParams {
    username: string,
    email: string,
    password: string,
}

export interface LoginParams {
    username: string,
    password: string,
}
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

// Todo stworzyc osobny plik dla routów USER i NOTE
export async function getLoginUser(): Promise<UserModel> {
    const response = await fetchData("api/users", { method: "GET"});
    return response.json();
}

export async function signUp(signUpParams: SignUpParams): Promise<UserModel> {
    const response = await fetchData("api/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpParams),
    });
    return response.json();
};

export async function login(loginParams: LoginParams): Promise<UserModel> {
    const response = await fetchData("api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginParams),
    });
    return response.json();
};

export async function logout() {
    await fetchData("api/users/logout", { method: "POST" });
};


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
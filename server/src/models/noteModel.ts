import { InferSchemaType, model, Schema } from "mongoose";

const noteSchema = new Schema({
    title: { 
        type: String,
        required: true,
    },
    text: {
        type: String
    },
}, {
    timestamps: true
});

// Check what kind of type we use. Thanks InferSchemaType it check automatics
type NoteModel = InferSchemaType<typeof noteSchema>;

export default model<NoteModel>("Note", noteSchema)
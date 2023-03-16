import { InferSchemaType, model, Schema } from "mongoose";

// tworzenie authenticznosci uytkownika
const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        // select: false nie zwracane jest jako default wiec musimy dodatkowo prosić o dostep do niego
        select: false,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    }
});

type UserModel = InferSchemaType<typeof userSchema>;

export default model<UserModel>("User", userSchema)
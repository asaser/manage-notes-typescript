import { RequestHandler } from "express";
// Todo zrobic w eslint aby tutaj uzywac pojedynczego ' a nie "
import createHttpError from "http-errors";
import UserModel from "../models/userModel";
import bcrypt from "bcrypt";

// Tdo może zmiana nazewnictwa będzie dobra
interface SignUpBody {
    username?: string,
    email?: string,
    password?: string,
}

interface LoginBody {
    username?: string,
    password?: string,
}

// jezeli user uzytkownik sie zaloguje to otwieramy login session i sprawdzamy czy uzytkownik nadal jest zalogowany czy nie
// sprawdzenie czy dane użytkownika są takie same jak zapisane w Cookies. Jeżeli usunie się Cookies wtedy użytkownik automatycznie jest wylogowywany
export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    const authenticatedUser = req.session.userId;

    try {
        const existingUser = await UserModel.findById(authenticatedUser).select("+email").exec();        
        res.status(200).json(existingUser);
    } catch (error) {
        next(error)
    }
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    // inna nazwa passwordRaw chodzi o to aby ie popelnic bledu podczas probowania hashowania hasla
    const passwordRaw = req.body.password;

    try {
        if(!username || !email || !passwordRaw) {
            throw createHttpError(400, "Users authentication false")
        }

        // Tdo sprwdzic bo jesli username i email sa takie same jak w bazie to w bazie danych nie wyswietla sie komunikat  tym a w konsoli tylko
        const existingUsername = await UserModel.findOne({ username: username}).exec();

        if(existingUsername) {
            throw createHttpError(409, "Please choose another username, because this is already taken")
        }

        const existingEmail = await UserModel.findOne({ email: email}).exec();

        if(existingEmail) {
            throw createHttpError(409, "Please choose another email, because this is already taken")
        }

        // Todo sprawdzic inny sposob haszowania bo ten co zrobilem moze da sie lepiej zrobic lub moze on zostac
        const passwordHashed = await bcrypt.hash(passwordRaw, 10);

        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: passwordHashed,
        });
        
        // ustawiamy tutaj automatyczne zapisywanie w sesji danych uzytkownika i przypisujemy je do userId
        req.session.userId = newUser._id;

        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        
    }
};

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    
    const username = req.body.username;
    const password = req.body.password;

    try {
        if(!username || !password) {
            throw createHttpError(400, "Parameters missing. Please check username and password")
        }

        // .select poniewaz szukając za pomocą findOne wykluczamy password i email z szukania bo zdefiniowalismy w userModel że SELECT jest na false
        // to dodaje również password i email do findOne
        const existingUser = await UserModel.findOne({ username: username }).select("+password +email").exec();

        if(!existingUser) {
            throw createHttpError(401, "Some of data are invalid");
        }

        // sprawdzamy czy haslo nalezy do uzytkownika
        const passwordMatch = await bcrypt.compare(password, existingUser.password ?? 'default password')

        if(!passwordMatch) {
            throw createHttpError(401, "Username or password is invalid");
        }

        req.session.userId = existingUser._id;

        res.status(201).json(existingUser);
    } catch (error) {
        next(error)
    }
};

export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy(error => {
        if(error) {
            next(error)
        } else {
            res.sendStatus(200);
        }
    })
}
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { UserModel } from "../../models/userModel";
import { LoginParams } from "../../routes/notesRouters";
import * as NewLoginParams from "../../routes/notesRouters";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputField from "../InputField/TextInputField";

import styleUtils from "../../styles/signUpComponent.module.css";
import { UnauthorizeError } from '../../errors/http_errors';

interface LoginProps {
    onDeregistration: () => void,
    onLoginSuccess: (user: UserModel) => void,
}

const LoginComponent = ({ onDeregistration, onLoginSuccess }: LoginProps) => {

    // sprawdzenie czy error message jest pokaanaze czy nie
    const [errorText, setErrorText] = useState<string | null>(null)

    const {register, handleSubmit, formState: { errors, isSubmitting }} = useForm<LoginParams>()
    
    async function onSubmit(params: LoginParams) {
        try {
            const userLogin = await NewLoginParams.login(params);
            onLoginSuccess(userLogin);
        } catch (error) {
            if(error instanceof UnauthorizeError) {
                setErrorText(error.message)
            } else {
                alert(error)
            }
            // Todo slabe trzeba dac jakis teks o error
            console.log(error);
            
        }
    }

    return ( 
        <Modal show onHide={onDeregistration}>
            <Modal.Header>
                <Modal.Title>
                    Login
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorText &&
                    <Alert variant='danger'>
                        {errorText}
                    </Alert>
                }
                <Form 
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <TextInputField 
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Username"
                        register={register}
                        registerOptions={{ required: "Reguired"}}
                        error={errors.username}
                    />
                    <TextInputField 
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{ required: "Reguired"}}
                        error={errors.password}
                    />
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={styleUtils.signupModule}
                    >
                        Login
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
 
export default LoginComponent;
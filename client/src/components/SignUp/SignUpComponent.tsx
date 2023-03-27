import { useState } from 'react';
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UserModel } from "../../models/userModel";
import * as NewSignUpParams from "../../routes/notesRouters";
import { SignUpParams } from "../../routes/notesRouters";
import TextInputField from "../InputField/TextInputField";

import styleUtils from "../../styles/signUpComponent.module.css";
import { ConflictError } from '../../errors/http_errors';

interface SignUpProps {
    onDeregistration: () => void,
    onSignUpSuccess: (user: UserModel) => void,
}

const SignUpComponent = ({onDeregistration, onSignUpSuccess}: SignUpProps) => {

    // Todo sprawdzic czy null powinien tutaj byc
    const [errorText, setErrorText] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<SignUpParams>();

    async function onSubmit(params: SignUpParams) {
        try {
            const newUser = await NewSignUpParams.signUp(params);
            onSignUpSuccess(newUser)
        } catch (error) {
            if(error instanceof ConflictError) {                
                setErrorText(error.message)
            } else {                
                alert(error)
            }
            console.log(error);
            
        }
    }
    return ( 
        <Modal show onHide={onDeregistration}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Sign up
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Todo to cos nie dziala i nie pokazuje jak wpisuje sie tego samego uzytkownika podczas SignUp trzeba to naprawić */}
                {errorText &&
                    <Alert variant='danger'>
                        {errorText}
                    </Alert>
                }
                <Form onSubmit={handleSubmit(onSubmit)}>
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
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Email"
                        register={register}
                        registerOptions={{ required: "Reguired"}}
                        error={errors.email}
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
                        Sign up
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
 
export default SignUpComponent;
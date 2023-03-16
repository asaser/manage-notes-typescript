import { Form } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextInputFieldProps {
    name: string,
    label: string,
    // to jest wziete z  react hook form
    register: UseFormRegister<any>,
    registerOptions?: RegisterOptions,
    error?: FieldError,
    // Todo zmienic nazwe x na inną
    // pozwala nam to wziac inne properties ktore moga byc potrzebne ale nie musimy ich tutaj nadmieniac
    // form inputs posiada duzo wlasciwosci i dzieki temu latwiej tak to zrobic
    [x: string]: any
}

const TextInputField = ({ name, label, register, registerOptions, error, ...props}: TextInputFieldProps) => {
    return ( 
        // controlId pozwala połączyć się z innymi elementami połączonymi między Child a Parent
        <Form.Group controlId={name + "-input"}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                {...props}
                {...register(name, registerOptions)}
                isInvalid={!!error}
            />
            <Form.Control.Feedback type="invalid">
                {error?.message}
            </Form.Control.Feedback>
        </Form.Group>
    );
}

export default TextInputField;
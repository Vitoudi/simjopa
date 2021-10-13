import React, { ReactElement, useContext, useState } from 'react'
import { AuthContext } from '../../globalContext/auth/AuthContext';
import AuthProtection from '../../hooks/AuthProtection';
import SignUpUserForm, { SignUpUserFormFields } from './components/SignUpUserForm';

interface Props {
    
}

export default function SignUpPage({}: Props): ReactElement {
    const auth = useContext(AuthContext);
    const [errorMsg, setErrorMsg] = useState("");

    function handleSubmit(formFields: SignUpUserFormFields) {
        const { email, name, password, imgFile } = formFields;
        

        const inputValidationRes= validateInputs(formFields);

        if (!inputValidationRes.success) {
            setErrorMsg(inputValidationRes.msg);
            return;
        }

        setErrorMsg("");

        auth.signUpUser({
            email,
            password,
            name,
            imgFile
        });
    }

    function validateInputs(formFields: SignUpUserFormFields) {
        const { email, name, password, imgFile } = formFields;

      if (!name) return { msg: "Adicione um nome", success: false };

      if (!password) return { msg: "Adicione uma senha", success: false };

      if (!email) return { msg: "Adicione um email", success: false };

      return { msg: "", success: true };
    }


    return (
      <SignUpUserForm onSubmit={handleSubmit} errorMsg={errorMsg} />
    );
}

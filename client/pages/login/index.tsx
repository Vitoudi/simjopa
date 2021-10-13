import { useRouter } from 'next/dist/client/router';
import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../globalContext/auth/AuthContext';
import FormContainer from '../../sheredComponents/FormContainer/FormContainer';
import Input from '../../sheredComponents/Input/Input';
import styles from "./Login.module.css";



interface Props {
    
}

export default function LoginPage({}: Props): ReactElement {
    const auth = useContext(AuthContext);
    const [errorMsg, setErrorMsg] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    useEffect(() => {
      const userIsAuthenticated = auth.authStatus === "authenticated";

      if (userIsAuthenticated)
        router.replace("/");

    }, [auth.authStatus, router])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formValidationResult = validateFormInfo();
        const formInfoIsValid = formValidationResult.success;

        if (!formInfoIsValid) return  setErrorMsg(formValidationResult.msg);
        
        const loginResponse = await auth.loginUser(email, password);
        if (!loginResponse.success) return setErrorMsg(loginResponse.msg);

    }

    function validateFormInfo() {
        if (!email)
            return {msg: "Digite um email", success: false};

        if (!password)
            return {msg: "Digite um senha", success: false};

        return { msg: "", success: true };
    }


    return (
      <div className={styles["page"]}>
        <FormContainer errorMsg={errorMsg} submitButtonText="Login" shouldShowDefaultSubmitButton={true} title="Login:" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="email"
            value={email}
            onValueChange={(value) => setEmail(value)}
          />
          <Input
            type="password"
            placeholder="senha"
            value={password}
            onValueChange={(value) => setPassword(value)}
          />
        </FormContainer>
        
      </div>
    );
}

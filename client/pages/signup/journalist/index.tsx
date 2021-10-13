import React, { ReactElement, useContext, useState } from "react";
import { AuthContext } from "../../../globalContext/auth/AuthContext";
import SignUpUserForm, { SignUpUserFormFields } from "../components/SignUpUserForm";
import { validateSignUpUserInputs } from "../utils/validateSignUpInputs";

interface Props {}

export default function SignUpJournalistPage({}: Props): ReactElement {
  const auth = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState("");

  function handleSubmit(formFields: SignUpUserFormFields) {
      const { email, password, name, imgFile } = formFields;

    const inputValidationRes = validateSignUpUserInputs(formFields);

    if (!inputValidationRes.success) {
      setErrorMsg(inputValidationRes.msg);
      return;
    }

    setErrorMsg("");

    auth.signUpJournalist({
      email,
      password,
      name,
      imgFile,
      committeId: 9
    });
  }


  return (
      <>
    <SignUpUserForm onSubmit={handleSubmit}/>
    <input type="number" ></input>
    </>
  );
}

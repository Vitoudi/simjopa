import React, { ReactElement, useContext, useState } from "react";
import { AuthContext } from "../../../globalContext/auth/AuthContext";
import SignUpUserForm, { SignUpUserFormFields } from "../components/SignUpUserForm";
import { validateSignUpUserInputs } from "../../../utils/validateSignUpInputs";
import { GetStaticProps } from "next";
import { GetCommitteeDto, sendRequestToGetCommittees } from "../../../utils/db/committees";
import SelectInput from "../../../sheredComponents/Input/SelectInput";
import { useRouter } from "next/dist/client/router";

export const getStaticProps: GetStaticProps = async () => {
  const committees = (await sendRequestToGetCommittees()) || [];
  
  return {
    props: { committees },
    revalidate: 10
  }
}

interface Props {
  committees: GetCommitteeDto[];
}

export default function SignUpJournalistPage({ committees }: Props): ReactElement {
  const auth = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [committeeId, setCommitteeId] = useState<number | null>(null);
  const router = useRouter();

  async function handleSubmit(formFields: SignUpUserFormFields) {
      const { email, password, name, imgFile } = formFields;  

    const inputValidationRes = validateSignUpUserInputs(formFields);

    if (!inputValidationRes.success) {
      setErrorMsg(inputValidationRes.msg);
      return;
    }

    if (!committeeId)
      return setErrorMsg("Selecione um comitê");

    const res = await auth.signUpJournalist({
      email,
      password,
      name,
      imgFile,
      committeId: committeeId
    });

    if (!res.success)
      setErrorMsg(res.msg);
    else
      router.push("/");
  }

  function handleCommitteeChange(value: string) {
    const numberValue = Number(value);
    if (isNaN(numberValue)) setErrorMsg("Selecione um comitê válido");
    setCommitteeId(numberValue);
  }


  return (
    <>
      <SignUpUserForm errorMsg={errorMsg} onSubmit={handleSubmit}>
        <SelectInput onValueChange={handleCommitteeChange} placeholder="Comitê">
          {committees.map((committee) => (
            <option key={committee.id} value={committee.id}>
              {committee.name}
            </option>
          ))}
        </SelectInput>
      </SignUpUserForm>
    </>
  );
}

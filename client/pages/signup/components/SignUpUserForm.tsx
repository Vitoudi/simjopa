import React, { ReactElement, useEffect, useState } from 'react'
import CenteredPageContent from '../../../sheredComponents/CenteredPageContent/CenteredPageContent';
import FormContainer from '../../../sheredComponents/FormContainer/FormContainer';
import Input from '../../../sheredComponents/Input/Input';

interface Props {
    onSubmit: (formFields: SignUpUserFormFields) => void;
    errorMsg?: string; 
}

export interface SignUpUserFormFields {
    email: string;
    name: string;
    password: string;
    imgFile?: File;
}

export default function SignUpUserForm({ onSubmit, errorMsg }: Props): ReactElement {

    const [formFields, setFormFields] = useState<SignUpUserFormFields>({
        email: "",
        name: "",
        password: "",
        imgFile: undefined
    });

    function changeFormField(fieldName: string, value: any) {
        setFormFields((fields) => ({
          ...fields,
          [fieldName]: value,
        }));
    }

    function handleChange(e: React.FormEvent<HTMLFormElement>) {

        const target = e.target as HTMLInputElement;

        if (target.type === "file") return;

        const fieldName = target.name;
        changeFormField(fieldName, target.value);
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
      const file = e.target.files?.[0];

      if (file) changeFormField("imgFile", file);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onSubmit(formFields);
    }


    return (
      <CenteredPageContent>
        <FormContainer
          shouldShowDefaultSubmitButton={true}
          submitButtonText="Criar"
          errorMsg={errorMsg}
          title="Criar conta:"
          onSubmit={(e) => onSubmit(formFields)}
        >
          <Input
            type="text"
            value={formFields.name}
            placeholder="nome"
            onValueChange={(value) => changeFormField("name", value)}
          />
          <Input
            type="email"
            value={formFields.email}
            placeholder="email"
            onValueChange={(value) => changeFormField("password", value)}
          />
          <Input
            type="password"
            value={formFields.password}
            placeholder="senha"
            onValueChange={(value) => changeFormField("password", value)}
          />
          <input
            type="file"
            name="imgFileInput"
            onChange={handleFileChange}
            id=""
          />
        </FormContainer>
      </CenteredPageContent>
    );
}

import { SignUpUserFormFields } from "../components/SignUpUserForm";

export function validateSignUpUserInputs(formFields: SignUpUserFormFields) {
  const { email, name, password, imgFile } = formFields;

  if (!name) return { msg: "Adicione um nome", success: false };

  if (!password) return { msg: "Adicione uma senha", success: false };

  if (!email) return { msg: "Adicione um email", success: false };

  return { msg: "", success: true };
}

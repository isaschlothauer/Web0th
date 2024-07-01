export interface FormDataInputProps {
  value: string;
  id: number;
  input: string;
  label: string;
  type: string;
  required: boolean;
}

export const accountRegistrationInputArray: FormDataInputProps[] = [
  {
    id: 0,
    input: "Email",
    label: "email",
    type: "text", 
    value: "",
    required: true,
  },
  {
    id: 1,
    input: "Password",
    label: "password",
    type: "password",
    value: "",
    required: true,
  },
  {
    id: 2,
    input: "Re-type Password",
    label: "passwordConfirm",
    type: "password",
    value: "",
    required: true,
  }
]
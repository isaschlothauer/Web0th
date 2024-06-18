export interface FormDataInputProps {
  id: number;
  input: string;
  label: string;
  type: string;
}

export const formDataInputs: FormDataInputProps[] = [
  {
    id: 0,
    input: "Email",
    label: "email",
    type: "text"
  },
  {
    id: 1,
    input: "Password",
    label: "password",
    type: "password"
  }
]
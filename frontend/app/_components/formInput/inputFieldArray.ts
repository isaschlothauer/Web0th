export interface FormDataInputProps {
  id: number;
  input: string;
  label: string;
  type: string;
  required: boolean;
}

export const formDataInputs: FormDataInputProps[] = [
  {
    id: 0,
    input: "Email",
    label: "email",
    type: "text",
    required: true,
  },
  {
    id: 1,
    input: "Password",
    label: "password",
    type: "password",
    required: true,
  }
]
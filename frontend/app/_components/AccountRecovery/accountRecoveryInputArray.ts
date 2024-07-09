export interface RecoveryDataInputProps {
  id: number;
  input: string;
  label: string;
  type: string;
  required: boolean;
}

export const accountRecoveryInputArray: RecoveryDataInputProps[] = [
  {
    id: 0,
    input: "Email",
    label: "email",
    type: "text",
    required: true,
  }
]
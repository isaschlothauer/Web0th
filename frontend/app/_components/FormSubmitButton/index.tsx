import buttonStyles from './index.module.css'

interface submitButtonProps {
  buttonName: string,
  disabled?: boolean
  // buttonProperties: {
  //   buttonName: string;
  //   disabled: boolean;
  // }
}

export default function SubmitButton(props: submitButtonProps) {
  const { buttonName } = props;
  return (
    <button
      type="submit"
      className={`${buttonStyles.button}`}
    >
      {buttonName}
    </button>
  )
}
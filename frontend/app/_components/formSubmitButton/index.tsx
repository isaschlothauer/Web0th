import buttonStyles from './index.module.css'

interface submitButtonProps {
  // buttonName: string
  buttonProperties: {
    buttonName: string;
    // disabled: boolean;
  }
}

export default function SubmitButton(props: submitButtonProps) {
  const { buttonName } = props.buttonProperties;
  return (
    <button
      type="submit"
      // className={buttonStyles.button}
      className={`${buttonStyles.button}`}
      // disabled={disabled}
    >
      {buttonName}
    </button>
  )
}
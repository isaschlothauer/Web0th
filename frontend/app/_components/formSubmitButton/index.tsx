import buttonStyles from './index.module.css'

interface submitButtonProps {
  buttonName: string
}

export default function SubmitButton(props: submitButtonProps) {
  console.log("this is a prop test", props.buttonName)
  return (
    <button
      type="submit"
      className={buttonStyles.button}
    >
      {props.buttonName}
    </button>
  )
}
import { MyButton } from './MyButton.tsx';

export default function TermsAndSubmit(props: { disabled: boolean }) {
  return (
    <>
      <div className="flex justify-between mt-2 ">
        <input type="checkbox" id="checkbox" required />
        <label htmlFor="checkbox">Accept Terms and Conditions agreement</label>
      </div>
      <MyButton
        text="Submit"
        type="submit"
        disabled={props.disabled}
        style={props.disabled ? { cursor: 'not-allowed' } : {}}
      />
    </>
  );
}

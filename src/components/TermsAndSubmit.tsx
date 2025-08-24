import { MyButton } from './MyButton.tsx';

export default function TermsAndSubmit(props: { disabled: boolean }) {
  const isDisabled = props.disabled;
  return (
    <>
      <div className="flex justify-between mt-2 ">
        <input type="checkbox" id="checkbox" required />
        <label htmlFor="checkbox">Accept Terms and Conditions agreement</label>
      </div>
      <MyButton
        text="Submit"
        type="submit"
        disabled={isDisabled}
        style={isDisabled ? { cursor: 'not-allowed' } : {}}
      />
    </>
  );
}

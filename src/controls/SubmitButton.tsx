import { MyButton } from '../components/MyButton';

export function SubmitButton() {
  return (
    <MyButton
      className="bg-blue-500 hover:bg-blue-700 font-bold h-[45px] px-4 rounded rounded-l-none "
      type="submit"
      text="Search"
    />
  );
}

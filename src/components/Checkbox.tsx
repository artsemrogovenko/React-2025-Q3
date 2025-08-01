import type { CheckboxProps } from './types';

export function Checkbox(props: CheckboxProps) {
  const { isChecked, onChange } = props;

  const handler = () => {
    onChange();
  };
  return (
    <div
      className="flex w-full e-8 gap-2 uppercase"
      onClick={(e) => e.stopPropagation()}
    >
      <input
        className=" size-5 items-center"
        data-testid="mark-favorite"
        type="checkbox"
        onChange={handler}
        checked={isChecked}
      />
      {isChecked ? 'in favorites' : 'add to favorites'}
    </div>
  );
}

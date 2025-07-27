export function ClearButton({ reset }: { reset: () => void }) {
  const handleclick = (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (event) event.stopPropagation();
    reset();
  };
  return (
    <button
      type="reset"
      className="absolute flex items-center justify-center size-[30px] right-2 top-1/2 transform -translate-y-1/2 rounded-full text-gray-500 hover:text-gray-700"
      onClick={handleclick}
      aria-label="Clear input"
    >
      x
    </button>
  );
}

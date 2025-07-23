export const ErrorButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button onClick={onClick} className="mt-4 px-4 py-2 rounded">
      Error Button
    </button>
  );
};

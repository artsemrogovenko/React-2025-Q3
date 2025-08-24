export default function ErrorTitle({
  message,
}: {
  message: string | undefined;
}) {
  if (!message) return <br />;
  return (
    <h5
      className="self-end capitalize"
      style={{ color: 'white' }}
      data-testid="errorTip"
    >
      {message}
    </h5>
  );
}

export default function ErrorTitle({
  message,
}: {
  message: string | undefined;
}) {
  if (!message) return <br />;
  return (
    <h5 className="self-end capitalize  " style={{ color: 'white' }}>
      {message}
    </h5>
  );
}

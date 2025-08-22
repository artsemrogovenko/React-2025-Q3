export default function ErrorTitle({ message }: { message: string }) {
  if (!message) return <br />;
  return (
    <h5 className="self-end" style={{ color: 'white' }}>
      {message}
    </h5>
  );
}

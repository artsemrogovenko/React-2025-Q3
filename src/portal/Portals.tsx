import { getPasswordStrength } from '../utils/utils.ts';

export default function StrengthHint({
  password,
}: {
  password?: string | undefined;
}) {
  const result = getPasswordStrength(password);

  switch (result) {
    case 'SIMPLE':
      return (
        <div className="text-red-500 font-semibold text-shadow-md">SIMPLE</div>
      );
    case 'MEDIUM':
      return (
        <div className="text-yellow-200 font-semibold text-shadow-md">
          MEDIUM
        </div>
      );
    case 'HARD':
      return (
        <div className="text-green-600 font-semibold text-shadow-md">HARD</div>
      );
    case 'REQUIRED':
      return <div className="  font-semibold text-shadow-md">REQUIRED</div>;
    default:
      return null;
  }
}

import type { ErrorsForm } from '../components/types.ts';
import type { ZodError } from 'zod';

export function zodErrorToObject(zodError: ZodError): ErrorsForm {
  const errors: ErrorsForm = {};

  zodError.issues.forEach((error) => {
    const ruleName = error.path[0];
    if (ruleName) {
      const errorKey = `${String(ruleName)}Error` as keyof ErrorsForm;
      if (!errors[errorKey]) errors[errorKey] = error.message;
    }
  });

  return errors;
}

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

export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = (error) => reject(error);
  });
};

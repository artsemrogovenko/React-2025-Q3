import type { ErrorsForm } from '../components/types.ts';
import type { UseFormRegister } from 'react-hook-form';
import type { TFormSchema } from '../utils/validate.ts';

export interface UncontrolledFormProps {
  errors: ErrorsForm;
  register?: UseFormRegister<TFormSchema>;
  isDirtyPicture?: boolean;
  invalidPicture?: boolean;
  password?: string;
}

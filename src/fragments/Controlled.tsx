import { formSchema, type TFormSchema } from '../utils/validate.ts';
import { type SubmitErrorHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import UncontrolledForm from './Uncontrolled.tsx';
import TermsAndSubmit from '../components/TermsAndSubmit.tsx';
import useStoreForm from '../hooks/hooks.ts';

export default function ControlledForm({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const { saveToStore } = useStoreForm();
  const onSubmit = async (data: TFormSchema) => {
    if (isValid) {
      await saveToStore(data);
      closeModal();
    }
  };
  const onError: SubmitErrorHandler<TFormSchema> = (errors) =>
    console.log(errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="flex flex-col content-between"
    >
      <UncontrolledForm
        register={register}
        errors={{
          pictureError: errors.picture?.message,
          nameError: errors.name?.message,
          ageError: errors.age?.message,
          emailError: errors.email?.message,
          passwordError: errors.password?.message,
          repeatError: errors.repeat?.message,
          genderError: errors.gender?.message,
          countryError: errors.country?.message,
        }}
      />
      <TermsAndSubmit disabled={!isValid} />
    </form>
  );
}

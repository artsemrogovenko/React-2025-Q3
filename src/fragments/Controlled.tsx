import { formSchema, type TFormSchema } from '../utils/validate.ts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import UncontrolledForm from './Uncontrolled.tsx';
import TermsAndSubmit from '../components/TermsAndSubmit.tsx';
import useStoreForm from '../hooks/hooks.ts';
import { useLayoutEffect, useState } from 'react';

export default function ControlledForm({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const { register, handleSubmit, getFieldState, formState, watch } =
    useForm<TFormSchema>({
      resolver: zodResolver(formSchema),
      mode: 'onChange',
    });

  const { errors, isValid } = formState;
  const { saveToStore } = useStoreForm();
  const onSubmit = async (data: TFormSchema) => {
    if (isValid) {
      await saveToStore(data);
      closeModal();
    }
  };
  const { isDirty, invalid } = getFieldState('picture', formState);
  const formPassword = watch('password');
  const [watchPassword, setWatchPassword] = useState<string>(formPassword);
  useLayoutEffect(() => {
    setWatchPassword(formPassword);
  }, [formPassword]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col content-between"
    >
      <UncontrolledForm
        password={watchPassword}
        isDirtyPicture={isDirty}
        invalidPicture={invalid}
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

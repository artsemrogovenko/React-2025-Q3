import { type FormEvent, useRef, useState } from 'react';
import { uncontroledShcema } from '../utils/validate.ts';
import type { ErrorsForm, FormType, Gender } from './types.ts';
import { z } from 'zod';
import { convertToBase64, zodErrorToObject } from '../utils/utils.ts';
import { useAppDispatch } from '../hooks/hooks.ts';
import { setData } from '../store/formSlice.ts';
import UncontrolledForm from '../fragments/Uncontrolled.tsx';
import ControlledForm from '../fragments/Controlled.tsx';
import TermsAndSubmit from './TermsAndSubmit.tsx';

export default function MyForm({
  onSubmit,
  type,
}: {
  onSubmit: () => void;
  type: FormType;
}) {
  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState<ErrorsForm>({});
  const [isSave, setIsSave] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);

  const handleUncontroled = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    if (!formRef.current) return;
    const entries = Object.fromEntries(new FormData(formRef.current));
    try {
      setIsSave(true);
      setErrors({});
      const validated = uncontroledShcema.parse(entries);
      const fileData = await convertToBase64(validated.picture);
      dispatch(
        setData({
          picture: fileData,
          name: validated.name,
          age: String(validated.age),
          email: validated.email,
          password: validated.password,
          gender: validated.gender as Gender,
          country: validated.country,
        })
      );
      onSubmit();
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, ...zodErrorToObject(error) }));
      }
    } finally {
      setIsSave(false);
    }
  };

  const selectedForm =
    type === 'controlled' ? (
      <ControlledForm />
    ) : (
      <form
        onSubmit={handleUncontroled}
        ref={formRef}
        className="flex flex-col content-between"
      >
        <UncontrolledForm errors={errors} />
        <TermsAndSubmit disabled={isSave} />
      </form>
    );

  return selectedForm;
}

import { type FormEvent, useRef, useState } from 'react';
import { uncontroledShcema } from '../utils/validate.ts';
import type { ErrorsForm, FormType } from './types.ts';
import { z } from 'zod';
import { zodErrorToObject } from '../utils/utils.ts';
import useStoreForm from '../hooks/hooks.ts';
import UncontrolledForm from '../fragments/Uncontrolled.tsx';
import ControlledForm from '../fragments/Controlled.tsx';
import TermsAndSubmit from './TermsAndSubmit.tsx';

export default function MyForm({
  closeModal,
  type,
}: {
  closeModal: () => void;
  type: FormType;
}) {
  const { saveToStore } = useStoreForm();

  const [errors, setErrors] = useState<ErrorsForm>({});
  const [isSave, setIsSave] = useState<boolean>(false);
  const [passwordValue, setPasswordValue] = useState<string>();

  const formRef = useRef<HTMLFormElement>(null);

  const handleUncontrolled = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    const entries = Object.fromEntries(new FormData(formRef.current));
    try {
      setIsSave(true);
      setErrors({});
      const validated = uncontroledShcema.parse(entries);
      await saveToStore(validated);
      closeModal();
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, ...zodErrorToObject(error) }));
      }
    } finally {
      const passwordValue = entries['password'];
      setPasswordValue(typeof passwordValue === 'string' ? passwordValue : '');
      setIsSave(false);
    }
  };

  return type === 'controlled' ? (
    <ControlledForm closeModal={closeModal} />
  ) : (
    <form
      onSubmit={handleUncontrolled}
      ref={formRef}
      className="flex flex-col content-between"
    >
      <UncontrolledForm errors={errors} password={passwordValue} />
      <TermsAndSubmit disabled={isSave} />
    </form>
  );
}

import { MyButton } from './MyButton.tsx';
import { type FormEvent, useRef, useState } from 'react';
import { formSchema } from '../utils/validate.ts';
import type { ErrorsForm, Gender } from './types.ts';
import { z } from 'zod';
import { convertToBase64, zodErrorToObject } from '../utils/utils.ts';
import { useAppDispatch } from '../hooks/hooks.ts';
import { setData } from '../store/formSlice.ts';
import UncontrolledForm from '../fragments/Uncontrolled.tsx';

export default function MyForm({ onSubmit }: { onSubmit: () => void }) {
  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState<ErrorsForm>({});
  const [isSave, setIsSave] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    const entries = Object.fromEntries(new FormData(formRef.current));
    try {
      setIsSave(true);
      setErrors({});
      const validated = formSchema.parse(entries);
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

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      className="flex flex-col content-between"
    >
      <UncontrolledForm errors={errors} />
      <div className="flex justify-between mt-2">
        <input type="checkbox" id="checkbox" required />
        <label htmlFor="checkbox">Accept Terms and Conditions agreement</label>
      </div>
      <MyButton text="Submit" type="submit" disabled={isSave} />
    </form>
  );
}

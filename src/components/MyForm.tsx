import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { Fragment } from 'react/jsx-runtime';
import { MyButton } from './MyButton.tsx';
import ErrorTitle from './ErrorTitle.tsx';
import { type FormEvent, useRef, useState } from 'react';
import { formSchema } from '../utils/validate.ts';
import type { ErrorsForm, Gender } from './types.ts';
import { z } from 'zod';
import { convertToBase64, zodErrorToObject } from '../utils/utils.ts';
import { useAppDispatch } from '../hooks/hooks.ts';
import { setData } from '../store/formSlice.ts';

const twClass =
  'border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:border-transparent';
const withError = 'border-red-500 focus:ring-red-500';
const withoutError = 'border-gray-300 focus:ring-blue-500';

export default function MyFormFragment({ onSubmit }: { onSubmit: () => void }) {
  const dispatch = useAppDispatch();

  const countries = useSelector((state: RootState) => state.countries);
  const options = countries.map((country) => {
    return (
      <Fragment key={country}>
        <option value={country} className="capitalize">
          {country}
        </option>
      </Fragment>
    );
  });

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
      <ErrorTitle message={errors.pictureError} />
      <div className="flex justify-between">
        <span>Avatar</span>
        <label htmlFor="picture" className="border">
          Upload image
        </label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          name="picture"
          id="picture"
          className="hidden"
        />
      </div>

      <ErrorTitle message={errors.nameError} />
      <div className="flex justify-between">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          autoFocus={true}
          className={`${twClass} ${errors.nameError ? withError : withoutError}`}
        />
      </div>

      <ErrorTitle message={errors.ageError} />
      <div className="flex justify-between">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          id="age"
          className={`${twClass} ${errors.ageError ? withError : withoutError}`}
        />
      </div>

      <ErrorTitle message={errors.emailError} />
      <div className="flex justify-between">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          className={`${twClass} ${errors.emailError ? withError : withoutError}`}
        />
      </div>

      <ErrorTitle message={errors.passwordError} />
      <div className="flex justify-between">
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          className={`${twClass} ${errors.passwordError ? withError : withoutError}`}
        />
      </div>

      <ErrorTitle message={errors.repeatError} />
      <div className="flex justify-between">
        <label htmlFor="repeat">Repeat Password</label>
        <input
          type="text"
          name="repeat"
          id="repeat"
          className={`${twClass} ${errors.repeatError ? withError : withoutError}`}
        />
      </div>

      <ErrorTitle message={errors.genderError} />
      <div className="flex justify-between">
        <label htmlFor="gender">Gender</label>
        <select
          name="gender"
          className={`${twClass} ${errors.genderError ? withError : withoutError}`}
        >
          <option value=""></option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <ErrorTitle message={errors.countryError} />
      <div className="flex justify-between">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          list="data"
          name="country"
          className={`${twClass} ${errors.countryError ? withError : withoutError}`}
        />
        <datalist id="data">{options}</datalist>
      </div>

      <div className="flex justify-between">
        <input type="checkbox" required />
        Accept Terms and Conditions agreement
      </div>
      <MyButton text="Submit" type="submit" disabled={isSave} />
    </form>
  );
}

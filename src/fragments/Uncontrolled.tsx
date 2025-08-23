import ErrorTitle from '../components/ErrorTitle.tsx';
import type { ErrorsForm } from '../components/types.ts';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store.ts';
import { Fragment } from 'react/jsx-runtime';
import type { TFormSchema } from '../utils/validate.ts';
import type { UseFormRegister } from 'react-hook-form';

const twClass =
  'border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:border-transparent';
const withError = 'border-red-500 focus:ring-red-500';
const withoutError = 'border-gray-300 focus:ring-blue-500';

export default function UncontrolledForm({
  errors,
  register,
}: {
  errors: ErrorsForm;
  register?: UseFormRegister<TFormSchema>;
}) {
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

  return (
    <>
      <ErrorTitle message={errors.pictureError} />
      <div className="flex justify-between">
        <span>Avatar</span>
        <label htmlFor="picture" className="border">
          Upload image
        </label>
        <input
          type="file"
          // accept="image/png, image/jpeg"

          id="picture"
          className="hidden"
          {...(register ? register('picture') : { name: 'picture' })}
        />
      </div>

      <ErrorTitle message={errors.nameError} />
      <div className="flex justify-between">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          // name="name"
          id="name"
          autoFocus={true}
          className={`${twClass} ${errors.nameError ? withError : withoutError}`}
          {...(register ? register('name') : { name: 'name' })}
        />
      </div>

      <ErrorTitle message={errors.ageError} />
      <div className="flex justify-between">
        <label htmlFor="age">Age</label>
        <input
          type="text"
          // name="age"
          id="age"
          className={`${twClass} ${errors.ageError ? withError : withoutError}`}
          {...(register ? register('age') : { name: 'age' })}
        />
      </div>

      <ErrorTitle message={errors.emailError} />
      <div className="flex justify-between">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          // name="email"
          className={`${twClass} ${errors.emailError ? withError : withoutError}`}
          {...(register ? register('email') : { name: 'email' })}
        />
      </div>

      <ErrorTitle message={errors.passwordError} />
      <div className="flex justify-between">
        <label htmlFor="password">Password</label>
        <input
          type="text"
          // name="password"
          className={`${twClass} ${errors.passwordError ? withError : withoutError}`}
          {...(register ? register('password') : { name: 'password' })}
        />
      </div>

      <ErrorTitle message={errors.repeatError} />
      <div className="flex justify-between">
        <label htmlFor="repeat">Repeat Password</label>
        <input
          type="text"
          // name="repeat"
          id="repeat"
          className={`${twClass} ${errors.repeatError ? withError : withoutError}`}
          {...(register ? register('repeat') : { name: 'repeat' })}
        />
      </div>

      <ErrorTitle message={errors.genderError} />
      <div className="flex justify-between">
        <label htmlFor="gender">Gender</label>
        <select
          // name="gender"
          className={`${twClass} ${errors.genderError ? withError : withoutError}`}
          {...(register ? register('gender') : { name: 'gender' })}
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
          // name="country"
          className={`${twClass} ${errors.countryError ? withError : withoutError}`}
          {...(register ? register('country') : { name: 'country' })}
        />
        <datalist id="data">{options}</datalist>
      </div>
    </>
  );
}

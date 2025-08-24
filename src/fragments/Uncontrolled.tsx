import ErrorTitle from '../components/ErrorTitle.tsx';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store.ts';
import { Fragment } from 'react/jsx-runtime';
import type { UncontrolledFormProps } from './types.ts';
import { PASSWORD_HINT } from '../constants.ts';
import StrengthHint from '../portal/Portals.tsx';

const twClass =
  'border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:border-transparent';
const withError = 'border-red-500 focus:ring-red-500';
const withoutError = 'border-gray-300 focus:ring-blue-500';

export default function UncontrolledForm({
  errors,
  register,
  isDirtyPicture,
  invalidPicture,
  password,
}: UncontrolledFormProps) {
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
  const noErrors = (!errors.pictureError || !invalidPicture) && isDirtyPicture;
  const uploadStyle = register
    ? `border ${noErrors ? 'bg-green-200' : 'animate-bounce'}`
    : 'border';

  const buttonTite = register
    ? noErrors
      ? 'File is ok'
      : 'Upload image'
    : 'Upload image';

  return (
    <>
      <ErrorTitle message={errors.pictureError} />
      <div className="flex justify-between">
        <span>Avatar</span>
        <label
          htmlFor="picture"
          className={`flex justify-center items-center w-[110px] ${uploadStyle}`}
        >
          {buttonTite}
        </label>
        <input
          type="file"
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
          className={`${twClass} ${errors.emailError ? withError : withoutError}`}
          {...(register ? register('email') : { name: 'email' })}
        />
      </div>

      <ErrorTitle message={errors.passwordError} />
      <div className="flex justify-between">
        <div id={PASSWORD_HINT}>
          <label htmlFor="password">Password</label>
          <StrengthHint password={password} />
        </div>
        <input
          type="text"
          className={`${twClass} ${errors.passwordError ? withError : withoutError}`}
          {...(register ? register('password') : { name: 'password' })}
        />
      </div>

      <ErrorTitle message={errors.repeatError} />
      <div className="flex justify-between">
        <label htmlFor="repeat">Repeat Password</label>
        <input
          type="text"
          id="repeat"
          className={`${twClass} ${errors.repeatError ? withError : withoutError}`}
          {...(register ? register('repeat') : { name: 'repeat' })}
        />
      </div>

      <ErrorTitle message={errors.genderError} />
      <div className="flex justify-between">
        <label htmlFor="gender">Gender</label>
        <select
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
          className={`${twClass} ${errors.countryError ? withError : withoutError}`}
          {...(register ? register('country') : { name: 'country' })}
        />
        <datalist id="data">{options}</datalist>
      </div>
    </>
  );
}

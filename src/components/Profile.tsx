import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import noImage from '../assets/no-image.svg';
import { Fragment } from 'react/jsx-runtime';

export default function Profile() {
  const formData = useSelector((state: RootState) => state.form);
  const fields = Object.entries(formData)
    .filter(([k]) => k !== 'picture')
    .map(([key, value]) => {
      return (
        <Fragment key={key}>
          <label className="grid grid-cols-2 ">
            {key.toUpperCase()}
            <input
              readOnly
              defaultValue={value || ''}
              className="grid-column-end"
            />
          </label>
          <hr />
        </Fragment>
      );
    });
  const image = formData.picture;
  return (
    <div>
      <img
        alt="avatar"
        src={image ? image : noImage}
        className="size-[200px]"
      />
      <div className="grid items-start w-[300px]">{fields} </div>
    </div>
  );
}

import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import type { Gender, Validated } from '../components/types.ts';
import { convertToBase64 } from '../utils/utils.ts';
import { setData } from '../store/formSlice.ts';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function useStoreForm() {
  const dispatch = useAppDispatch();

  const saveToStore = async (formData: Validated) => {
    let fileData: string;
    if (formData.picture instanceof FileList) {
      fileData = await convertToBase64(formData.picture[0]);
    } else {
      fileData = await convertToBase64(formData.picture);
    }
    dispatch(
      setData({
        picture: fileData,
        name: formData.name,
        age: String(formData.age),
        email: formData.email,
        password: formData.password,
        gender: formData.gender as Gender,
        country: formData.country,
      })
    );
  };
  return { saveToStore };
}

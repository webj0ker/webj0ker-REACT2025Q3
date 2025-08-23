import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { addControlled } from '../../store/formSlice';
import { formSchema } from '../../utils/validation';
import './Form.css';

interface FormValues {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  terms: boolean;
  image: FileList;
  country: string;
}

export default function ControlledForm({ onSuccess }: { onSuccess: () => void }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: FormValues) => {
    dispatch(addControlled({
      ...data,
      image: data.image[0] ? URL.createObjectURL(data.image[0]) : '',
    }));
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="form">
      <label htmlFor="name">Name</label>
      <input id="name" {...register('name')} />
      {formState.errors.name && <div className="error">{formState.errors.name.message}</div>}
      <button type="submit" disabled={!formState.isValid}>Submit</button>
    </form>
  );
}